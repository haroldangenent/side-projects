import React from 'react'
import { StyleSheet, View } from 'react-native'

export default ({ children }) => (
  <View style={styles.container}>{children}</View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 40,
  },
})
