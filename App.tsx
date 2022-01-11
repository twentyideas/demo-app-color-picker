import { StatusBar } from 'expo-status-bar'
import { useWindowDimensions, StyleSheet, Text, View } from 'react-native'
import { ColorPicker } from "./components/ColorPicker"
import React from "react"
import { Color } from "./utils/Color"
import { uiColors } from "./utils/styles"

export default function App() {
    const [coverUi, setCoverUi] = React.useState(true)
    const { width, height } = useWindowDimensions()
    const [color, setColor] = React.useState<Color>(new Color(255, 255, 255))
    return (
        <View style={[styles.container, { backgroundColor: color.toHex() }]}>
            <ColorPicker size={Math.min(width, height) - 30} color={color} setColor={setColor} onDraw={React.useCallback(() => { setCoverUi(false) }, [])} />
            <Text style={{color: color.value > 50 ? uiColors.darkText : uiColors.lightText}}>{color.toHex()}</Text>
            {coverUi && <View style={styles.cover}><Text>Loading...</Text></View>}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cover: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fefefe',
        position: "absolute",
        width: '100%',
        height: '100%'
    }
})
