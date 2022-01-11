import React, {FunctionComponent} from "react"
import {ExpoWebGLRenderingContext, GLView} from "expo-gl"
import Expo2DContext from "expo-2d-context"
import {Pressable, View} from "react-native"

const defaultOptions = { fastFillTesselation: false, renderWithOffscreenBuffer: false, maxGradStops: 128 }

interface CanvasProps {
    width: number
    height: number
    style?: any[]
    onContextCreate: (ctx: Expo2DContext, dimensions: { width: number, height: number }) => void
    onPress?: (position: { x: number, y: number, width: number, height: number }) => void
}

export const Canvas: FunctionComponent<CanvasProps> = ({ style, width, height, onContextCreate, onPress }) => {
    const [gl, setGl] = React.useState<null | ExpoWebGLRenderingContext>(null);
    const [glViewDimensions, setGLViewDimensions] = React.useState<{ width: number, height: number }>({ width: 0, height: 0 })
    React.useEffect(() => {
        if (gl?.contextId) {
            // @ts-ignore the types are wrong for this
            const newCtx = new Expo2DContext(gl, defaultOptions)
            onContextCreate(newCtx, glViewDimensions)
        }
    }, [gl?.contextId])

    const onGLContextCreate = React.useCallback((gl) => {
        setGl(gl)
    }, [])

    const shouldDisplayGlView = glViewDimensions?.width > 0 && glViewDimensions?.height > 0

    return (
        <View style={[{ width, height }, style]}>
            <Pressable onPress={React.useCallback((event) => {
                onPress?.({ x: event.nativeEvent.locationX, y: event.nativeEvent.locationY, ...glViewDimensions })
            }, [onPress, glViewDimensions])} style={{ flex: 1, width: '100%', height: '100%' }} onLayout={React.useCallback((event) => {
                setGLViewDimensions({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height})
            }, [])}>
                {shouldDisplayGlView && <GLView {...glViewDimensions} onContextCreate={onGLContextCreate} />}
            </Pressable>
        </View>
    )
}
