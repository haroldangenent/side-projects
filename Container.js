import React from 'react'
import { StyleSheet, View } from 'react-native'

export default props => (
  <View style={[styles.container, props.style]}>{props.children}</View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 40,
  },
})
