import {StyleSheet} from "react-native";

export const uiColors = {
    darkGray: '#333333',
    medGray: '#888888',
    lightText: '#fefefe',
    darkText: '#111111',
    white: '#ffffff'
}

export const styles = StyleSheet.create({
    colorPicker: {
        borderWidth: 1,
        borderColor: uiColors.medGray,
        marginBottom: 24,
        backgroundColor: uiColors.white
    },
    huePicker: {
        borderWidth: 1,
        borderColor: uiColors.medGray,
        marginBottom: 32,
        backgroundColor: uiColors.white
    }
});
