import React, { FunctionComponent } from "react";
import { PixelRatio } from "react-native";
import Expo2DContext from "expo-2d-context";
import { Color } from "../utils/Color";
import { styles } from "../utils/styles";
import { Canvas } from "./Canvas";
import { Setter } from "../utils/types";
import { HuePicker } from "./HuePicker";

export const ColorPicker: FunctionComponent<{ size: number, color: Color, setColor: Setter<Color>, onDraw?: () => void }> = ({ color, size, onDraw  }) => {
    const [colorCtx, setColorCtx] = React.useState<null | Expo2DContext>(null);
    const [hue, setHue] = React.useState(color.hue)
    const hueColor = React.useMemo(() => Color.fromHue(hue), [hue])
    const scaledSize = PixelRatio.getPixelSizeForLayoutSize(size)

    React.useEffect(() => {
        setHue(color.hue)
    }, [color.hue])

    React.useEffect(() => {
        if (!colorCtx) return;

        const grad = colorCtx.createLinearGradient(0, 0, scaledSize, 0);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(1, hueColor.toString());

        colorCtx.fillStyle = grad;
        colorCtx.fillRect(0, 0, scaledSize, scaledSize);

        const vgrad = colorCtx.createLinearGradient(0, 0,0 , scaledSize);
        vgrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vgrad.addColorStop(1, 'rgba(0, 0, 0, 255)');

        colorCtx.fillStyle = vgrad;
        colorCtx.fillRect(0, 0, scaledSize, scaledSize);
        colorCtx.flush();
        onDraw?.();
    }, [colorCtx, hueColor, scaledSize])

    return (
        <>
            <Canvas width={size} height={size} style={[ styles.colorPicker ]} onContextCreate={setColorCtx} />
            <HuePicker width={size} height={35} hue={hue} setHue={setHue} />
        </>
    )
}

