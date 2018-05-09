import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default ({ children, style }) => (
  <Text style={[styles.text, style]}>{children}</Text>
)

export const css = {
  color: '#fff',
  fontSize: 22,
  fontWeight: '600',
  marginBottom: 20,
}

const styles = StyleSheet.create({ text: css })
