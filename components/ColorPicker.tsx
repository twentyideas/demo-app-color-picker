import React, { FunctionComponent } from "react"
import { Color } from "../utils/Color"
import { styles } from "../utils/styles"
import { Canvas } from "./Canvas"
import { Setter } from "../utils/types"
import { HuePicker } from "./HuePicker"
import { ColorGradient } from "./ColorGradient"

const ColorPickerUi: FunctionComponent<{
  hue: number
  height: number
  width: number
  onPress: (coords: {
    x: number
    y: number
    width: number
    height: number
  }) => void
}> = ({ hue, height, width, onPress }) => {
  return (
    <Canvas
      width={height}
      height={width}
      style={[styles.colorPicker]}
      onPress={onPress}
    >
      <ColorGradient hue={hue} />
    </Canvas>
  )
}

export const ColorPicker: FunctionComponent<{
  size: number
  color: Color
  setColor: Setter<Color>
}> = ({ color, size, setColor }) => {
  const [hue, setHue] = React.useState(color.hue)

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

  const onPress = React.useCallback(
    (coords: { x: number; y: number; width: number; height: number }) => {
      const sat = (coords.x / coords.width) * 100
      const val = 100 - (coords.y / coords.height) * 100
      setColor(Color.fromHsva(hue, sat, val))
    },
    [setColor, hue]
  )

  return (
    <>
      <ColorPickerUi hue={hue} height={size} width={size} onPress={onPress} />
      <HuePicker width={size - 5} height={35} hue={hue} setHue={setHue} />
    </>
  )
}
