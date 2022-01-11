import React, { FunctionComponent } from "react"
import { View } from "react-native"
import { Canvas } from "./Canvas"
import { styles } from "../utils/styles"
import { Setter } from "../utils/types"
import { HueGradient } from "./HueGradient"
import { Color, HUE_DEGREES } from "../utils/Color"

const HueMarker: FunctionComponent<{ left: number; hue: number }> = ({
  left,
  hue,
}) => {
  const bg = React.useMemo(
    () => ({ backgroundColor: Color.fromHue(hue).toHex() }),
    [hue]
  )
  return (
    <View style={[styles.hueMarker_container, { left }]}>
      <View style={[styles.hueMarker, styles.hueMarker_borderDark, bg]} />
      <View style={[styles.hueMarker, styles.hueMarker_borderLight, bg]} />
    </View>
  )
}

export const HuePicker: FunctionComponent<{
  width: number
  height: number
  hue: number
  setHue: Setter<number>
  padding?: number
}> = ({ width, height, padding = 1.5, hue, setHue }) => {
  const selectHue = React.useCallback(
    (coords: { x: number; width: number }) => {
      setHue(
        Math.max(0, Math.min(360, (coords.x / coords.width) * HUE_DEGREES))
      )
    },
    [setHue]
  )

  const huePosition = Math.floor((hue / HUE_DEGREES) * (width - 10))
  const gradient = React.useMemo(() => <HueGradient />, [])

  return (
    <Canvas
      style={[{ padding }, styles.huePicker]}
      width={width}
      height={height}
      onDrag={selectHue}
      onPress={selectHue}
    >
      {gradient}
      <HueMarker left={huePosition} hue={hue} />
    </Canvas>
  )
}
