import Expo2DContext from "expo-2d-context"
import { PixelRatio } from "react-native"
import { Color } from "./Color"

const colors = {
  red: "#ff0000",
  yellow: "#ffff00",
  lime: "#00ff00",
  cyan: "#00ffff",
  blue: "#0000ff",
  magenta: "#ff00ff",
  transparentBlack: "rgba(0, 0, 0, 0)",
  black: "#000000",
  white: "#ffffff",
}

// Draws a rainbow hue gradient filling the given context 🌈
export function fillWithHueGradient(
  ctx: Expo2DContext,
  width: number,
  height: number
): void {
  const hueGradientColors = [
    colors.red,
    colors.yellow,
    colors.lime,
    colors.cyan,
    colors.blue,
    colors.magenta,
    colors.red,
  ]
  const scaledWidth = PixelRatio.getPixelSizeForLayoutSize(width)
  const scaledHeight = PixelRatio.getPixelSizeForLayoutSize(height)
  const gradient = ctx.createLinearGradient(0, 0, scaledWidth, 0)
  for (let i = 0; i < hueGradientColors.length; ++i) {
    const start = i / (hueGradientColors.length - 1)
    gradient.addColorStop(start, hueGradientColors[i])
  }
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, scaledWidth, scaledHeight)
  ctx.flush()
}

export function fillWithColorPickerGradient(
  ctx: Expo2DContext,
  width: number,
  height: number,
  hue: number
) {
  const scaledWidth = PixelRatio.getPixelSizeForLayoutSize(width)
  const scaledHeight = PixelRatio.getPixelSizeForLayoutSize(height)

  const saturationGradient = ctx.createLinearGradient(0, 0, scaledWidth, 0)
  saturationGradient.addColorStop(0, colors.white)
  saturationGradient.addColorStop(1, Color.fromHue(hue).toString())

  ctx.fillStyle = saturationGradient
  ctx.fillRect(0, 0, scaledWidth, scaledHeight)

  const lightnessGradient = ctx.createLinearGradient(0, 0, 0, scaledHeight)
  lightnessGradient.addColorStop(0, colors.transparentBlack)
  lightnessGradient.addColorStop(1, colors.black)

  ctx.fillStyle = lightnessGradient
  ctx.fillRect(0, 0, scaledWidth, scaledHeight)
  ctx.flush()
}
