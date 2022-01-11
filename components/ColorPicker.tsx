import React, { FunctionComponent } from "react";
import { PixelRatio } from "react-native";
import Expo2DContext from "expo-2d-context";
import { Color } from "../utils/Color";
import { styles } from "../utils/styles";
import { Canvas } from "./Canvas";
import { Setter } from "../utils/types";
import { HuePicker } from "./HuePicker";

export const ColorPicker: FunctionComponent<{ size: number, color: Color, setColor: Setter<Color>, onDraw?: () => void }> = ({ color, size, onDraw, setColor  }) => {
    const [canvasInfo, setCanvasInfo] = React.useState<{ ctx: null | Expo2DContext, width: number, height: number }>({ ctx: null, width: 0, height: 0 } )
    const [hue, setHue] = React.useState(color.hue)
    const hueColor = React.useMemo(() => Color.fromHue(hue), [hue])

    React.useEffect(() => {
        if (color.saturation > 0) {
            setHue(color.hue)
        }
    }, [color])

    React.useEffect(() => {
        if (color.hue !== hue) {
            setColor(Color.fromHsva(hue, color.saturation, color.value))
        }
    }, [color, hue])

    React.useEffect(() => {
        if (!canvasInfo.ctx) return;

        const scaledWidth = PixelRatio.getPixelSizeForLayoutSize(canvasInfo.width)
        const scaledHeight = PixelRatio.getPixelSizeForLayoutSize(canvasInfo.height)

        const horizontalGradient = canvasInfo.ctx.createLinearGradient(0, 0, scaledWidth, 0);
        horizontalGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        horizontalGradient.addColorStop(1, hueColor.toString())

        canvasInfo.ctx.fillStyle = horizontalGradient
        canvasInfo.ctx.fillRect(0, 0, scaledWidth, scaledHeight)

        const verticalGradient = canvasInfo.ctx.createLinearGradient(0, 0,0 , scaledHeight)
        verticalGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
        verticalGradient.addColorStop(1, 'rgba(0, 0, 0, 255)')

        canvasInfo.ctx.fillStyle = verticalGradient
        canvasInfo.ctx.fillRect(0, 0, scaledWidth, scaledHeight)
        canvasInfo.ctx.flush()
        onDraw?.()
    }, [canvasInfo, hueColor])

    return (
        <>
            <Canvas
                width={size}
                height={size}
                style={[ styles.colorPicker ]}
                onContextCreate={React.useCallback((ctx, dims) => {
                    setCanvasInfo({ ctx, ...dims })
                }, [])}
                onPress={React.useCallback((coords) => {
                    const sat = coords.x / coords.width * 100;
                    const val = 100 - coords.y / coords.height * 100;
                    setColor(Color.fromHsva(hue, sat, val))
                }, [setColor, hue])}
            />
            <HuePicker width={size - 5} height={35} hue={hue} setHue={setHue} />
        </>
    )
}

