import React, {FunctionComponent} from "react";
import {ExpoWebGLRenderingContext, GLView} from "expo-gl";
import Expo2DContext from "expo-2d-context";

const defaultOptions = { fastFillTesselation: false, renderWithOffscreenBuffer: false, maxGradStops: 128 };

export const Canvas: FunctionComponent<{ width: number, height: number, style?: any[], onContextCreate: (ctx: Expo2DContext) => void}> = ({ style, width, height, onContextCreate }) => {
    const [gl, setGl] = React.useState<null | ExpoWebGLRenderingContext>(null);
    React.useEffect(() => {
        if (gl?.contextId) {
            // @ts-ignore the types are wrong for this
            const newCtx = new Expo2DContext(gl, defaultOptions)
            onContextCreate(newCtx);
        }
    }, [gl?.contextId])

    const onGLContextCreate = React.useCallback((gl) => {
        setGl(gl)
    }, [])

    return <GLView style={[{ width, height }, style]} onContextCreate={onGLContextCreate} />
}
