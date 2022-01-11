import { FunctionComponent } from "react"
import { LinearGradient } from "expo-linear-gradient"

const colors = {
  red: "#ff0000",
  yellow: "#ffff00",
  lime: "#00ff00",
  cyan: "#00ffff",
  blue: "#0000ff",
  magenta: "#ff00ff",
}

export const HueGradient: FunctionComponent = () => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.5 }}
      end={{ x: 1.0, y: 0.5 }}
      style={{ width: "100%", height: "100%" }}
      colors={[
        colors.red,
        colors.yellow,
        colors.lime,
        colors.cyan,
        colors.blue,
        colors.magenta,
        colors.red,
      ]}
    />
  )
}
