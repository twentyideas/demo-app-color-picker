import React, { FunctionComponent } from "react"
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  View,
} from "react-native"

export interface CanvasTouchEvent {
  x: number
  y: number
  width: number
  height: number
  event: GestureResponderEvent
}

export type CanvasTouchHandler = (e: CanvasTouchEvent) => void

interface CanvasProps {
  width: number
  height: number
  style?: any[]
  onPress?: CanvasTouchHandler
  onDrag?: CanvasTouchHandler
}

export const Canvas: FunctionComponent<CanvasProps> = ({
  style,
  width,
  height,
  onPress,
  onDrag,
  children,
}) => {
  const [innerDimensions, setInnerDimensions] = React.useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const getGestureHandler = React.useCallback(
    (handler: CanvasTouchHandler) => (event: GestureResponderEvent) => {
      handler?.({
        x: event.nativeEvent.locationX,
        y: event.nativeEvent.locationY,
        ...innerDimensions,
        event,
      })
    },
    [innerDimensions]
  )

  const onPressHandler = React.useCallback(
    onPress ? getGestureHandler(onPress) : () => {},
    [getGestureHandler, onPress]
  )
  const onDragHandler = React.useCallback(
    onDrag ? getGestureHandler(onDrag) : () => {},
    [getGestureHandler, onDrag]
  )

  const getInnerDimensions = React.useCallback((event: LayoutChangeEvent) => {
    setInnerDimensions({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    })
  }, [])

  return (
    <View style={[{ width, height }, style]}>
      <Pressable
        onPress={onPressHandler}
        onTouchMove={onDragHandler}
        style={{ flex: 1, width: "100%", height: "100%" }}
        onLayout={getInnerDimensions}
      >
        {children}
      </Pressable>
    </View>
  )
}
