import React, {FunctionComponent} from "react"
import { PixelRatio } from "react-native"
import { Canvas } from "./Canvas"
import { styles } from "../utils/styles"
import {Setter} from "../utils/types"

const pureHues = [
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#ff0000"
]

export const HuePicker: FunctionComponent<{ width: number, height: number, hue: number, setHue: Setter<number>, padding?: number }> = ({ width, height, padding = 1.5, setHue}) => {
    // Draws a rainbow hue gradient 🌈
    const drawHueGradient = React.useCallback((ctx, dims) => {
        const scaledWidth = PixelRatio.getPixelSizeForLayoutSize(dims.width)
        const scaledHeight = PixelRatio.getPixelSizeForLayoutSize(dims.height)
        ctx.clearRect(0, 0, scaledWidth, scaledHeight)
        const hueGrad = ctx.createLinearGradient(0, 0, scaledWidth, 0)
        for (let i = 0; i < pureHues.length; ++i) {
            const start = i / (pureHues.length - 1)
            hueGrad.addColorStop(start, pureHues[i])
        }
        ctx.fillStyle = hueGrad;
        ctx.fillRect(0, 0, scaledWidth, scaledHeight);
        ctx.flush()
    }, [])

    return <Canvas style={[{ padding }, styles.huePicker]} width={width} height={height} onContextCreate={drawHueGradient}
                   onPress={React.useCallback((coords) => {
                       setHue(coords.x / coords.width * 360)
                   }, [setHue])} />
};
