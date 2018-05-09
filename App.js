import React from 'react'
import { Text, TouchableHighlight } from 'react-native'
import { createStackNavigator } from 'react-navigation';
import Home from './Home'

class ProjectScreen extends React.Component {
  render() {
    return <TouchableHighlight onPress={() => this.props.navigation.goBack()}><Text>{this.props.navigation.state.params.project.title}</Text></TouchableHighlight>
  }
}

export default App = createStackNavigator({
  Home: { screen: Home },
  Project: { screen: ProjectScreen },
}, { headerMode: 'none' });
