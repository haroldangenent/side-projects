import React from 'react'
import { Text, TouchableHighlight } from 'react-native'

export default class Project extends React.Component {
  render() {
    return <TouchableHighlight onPress={() => this.props.navigation.goBack()}><Text>{this.props.navigation.state.params.project.title}</Text></TouchableHighlight>
  }
}
