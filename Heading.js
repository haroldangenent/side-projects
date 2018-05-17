import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default ({ style, children }) => (
  <Text style={[styles.heading, style]}>{children}</Text>
)

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 30,
  },
})
