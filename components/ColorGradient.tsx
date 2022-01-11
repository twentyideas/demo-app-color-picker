import React, { FunctionComponent } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { View } from "react-native"
import { Color } from "../utils/Color"

const colors = {
  transparentBlack: "rgba(0, 0, 0, 0)",
  black: "#000000",
  white: "#ffffff",
}

export const ColorGradient: FunctionComponent<{ hue: number }> = ({ hue }) => {
  const saturationGradient = React.useMemo(
    () => (
      <LinearGradient
        key="satGradient"
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        colors={[colors.white, Color.fromHue(hue).toString()]}
      />
    ),
    [hue]
  )
  const lightnessGradient = React.useMemo(
    () => (
      <LinearGradient
        key="lightGradient"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        colors={[colors.transparentBlack, colors.black]}
      />
    ),
    []
  )
  return (
    <View style={{ width: "100%", height: "100%" }}>
      {saturationGradient}
      {lightnessGradient}
    </View>
  )
}
