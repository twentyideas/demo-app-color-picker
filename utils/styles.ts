import { StyleSheet } from "react-native"

export const uiColors = {
  darkGray: "#333333",
  medGray: "#888888",
  lightGray: "#aaaaaa",
  lightText: "#fefefe",
  darkText: "#111111",
  white: "#ffffff",
}

export const styles = StyleSheet.create({
  colorPicker: {
    borderWidth: 1,
    borderColor: uiColors.medGray,
    marginBottom: 24,
    backgroundColor: uiColors.white,
  },
  huePicker: {
    borderWidth: 1,
    borderColor: uiColors.medGray,
    marginBottom: 32,
    backgroundColor: uiColors.white,
  },
  hueMarker_container: {
    height: "100%",
    position: "absolute",
    top: 0,
    width: 7,
  },
  hueMarker: {
    borderWidth: 1,
    width: 5,
    position: "absolute",
    height: "100%",
  },
  hueMarker_borderDark: {
    borderColor: uiColors.darkGray,
    opacity: 0.5,
    top: 0,
    left: 1,
  },
  hueMarker_borderLight: {
    borderColor: uiColors.lightText,
    opacity: 0.7,
    top: 0,
    left: 0,
  },
})
