import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default props => (
  <Text style={styles.heading}>{props.children}</Text>
)

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 30,
  },
})
