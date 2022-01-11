import React from "react"
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const HueGradient = (props: SvgProps) => (
  <Svg {...props}>
    <Defs>
      <LinearGradient id="a">
        <Stop offset={0} stopColor="red" />
        <Stop offset={0.286} stopColor="#ff0" />
        <Stop offset={0.429} stopColor="#0f0" />
        <Stop offset={0.571} stopColor="#0ff" />
        <Stop offset={0.714} stopColor="#00f" />
        <Stop offset={0.857} stopColor="#f0f" />
        <Stop offset={1} stopColor="red" />
      </LinearGradient>
    </Defs>
    <Rect width="100%" height="100%" fill="url(#a)" />
  </Svg>
)
