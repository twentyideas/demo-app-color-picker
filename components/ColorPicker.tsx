import React, { FunctionComponent } from "react"
import { Color } from "../utils/Color"
import { styles } from "../utils/styles"
import { Canvas, CanvasTouchHandler } from "./Canvas"
import { Setter } from "../utils/types"
import { HuePicker } from "./HuePicker"
import { ColorGradient } from "./ColorGradient"

const ColorPickerUi: FunctionComponent<{
  hue: number
  height: number
  width: number
  onPress: CanvasTouchHandler
  onDrag: CanvasTouchHandler
}> = ({ hue, height, width, onPress, onDrag }) => {
  return (
    <Canvas
      width={height}
      height={width}
      style={[styles.colorPicker]}
      onPress={onPress}
      onDrag={onDrag}
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
  const hueRef = React.useRef(hue)

  React.useEffect(() => {
    hueRef.current = hue
  }, [hue])

  React.useEffect(() => {
    if (color.hue !== hue) {
      setColor(Color.fromHsva(hue, color.saturation, color.value))
    }
  }, [color, hue])

  const selectColor = React.useCallback<CanvasTouchHandler>(
    coords => {
      const sat = Math.max(0, Math.min(100, (coords.x / coords.width) * 100))
      const val = Math.max(0, Math.min(100, 100 - (coords.y / coords.height) * 100))
      setColor((currentColor) => {
        if (currentColor.hue != hueRef.current || currentColor.saturation != sat || currentColor.value != val) {
          return Color.fromHsva(hueRef.current, sat, val)
        } else {
          return currentColor
        }
      })
    },
    [setColor]
  )

  return (
    <>
      <ColorPickerUi
        hue={hue}
        height={size}
        width={size}
        onPress={selectColor}
        onDrag={selectColor}
      />
      <HuePicker width={size - 5} height={35} hue={hue} setHue={setHue} />
    </>
  )
}
