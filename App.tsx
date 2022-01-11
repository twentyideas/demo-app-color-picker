import { StatusBar } from "expo-status-bar"
import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  ToastAndroid,
} from "react-native"
import { ColorPicker } from "./components/ColorPicker"
import React from "react"
import { Color } from "./utils/Color"
import { uiColors } from "./utils/styles"
import * as Sentry from "sentry-expo"
import * as Clipboard from "expo-clipboard"

Sentry.init({
  dsn: "https://4d80ed544b3e496e929f645ad3b74576@o261101.ingest.sentry.io/6143697",
  enableInExpoDevelopment: true,
  debug: __DEV__, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

export default Sentry.Native.wrap(App)

export function App() {
  const { width, height } = useWindowDimensions()
  const [color, setColor] = React.useState<Color>(new Color(255, 255, 255))
  const shouldUseLightText = color.value < 50
  const hex = color.toHex()

  const copyHex = React.useCallback(() => {
    Clipboard.setString(hex)
    ToastAndroid.show("Copied!", ToastAndroid.SHORT)
  }, [hex])

  return (
    <View style={[styles.container, { backgroundColor: color.toHex() }]}>
      <ColorPicker
        size={Math.min(width, height) - 30}
        color={color}
        setColor={setColor}
      />
      <Pressable hitSlop={8} onPress={copyHex}>
        <Text
          style={{
            color: shouldUseLightText ? uiColors.lightText : uiColors.darkText,
          }}
        >
          {hex}
        </Text>
      </Pressable>
      <StatusBar style={shouldUseLightText ? "light" : "dark"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fefefe",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
})
