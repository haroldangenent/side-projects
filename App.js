import React from 'react'
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableHighlight, TextInput, AsyncStorage } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import color from './color'
import Swipeable from 'react-native-swipeable'
import { createStackNavigator } from 'react-navigation';

class ProjectScreen extends React.Component {
  render() {
    return <TouchableHighlight onPress={() => this.props.navigation.goBack()}><Text>{this.props.navigation.state.params.project.title}</Text></TouchableHighlight>
  }
}

const Project = ({ background, onDelete, onPress, onSubmit, title }) => (
  <Swipeable rightContent={<View style={{ display: 'none' }} />} onRightActionRelease={onDelete}>
    <TouchableHighlight underlayColor={color.darken(background)} style={[styles.box, { backgroundColor: background }]} onPress={onPress}>
      <View>
        {title ? (
          <Text style={[styles.boxText, { color: color.contrast(background) }]}>{title}</Text>
        ) : (
          <TextInput
            style={[styles.boxText, { color: color.contrast(background) }]}
            placeholder="Your project name"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
        )}
        <View style={styles.progressBar}>
          <View style={[styles.progressBarFill, { backgroundColor: color.contrast(background) }]} />
        </View>
      </View>
    </TouchableHighlight>
  </Swipeable>
)

class HomeScreen extends React.Component {
  state = {
    projects: [],
  }

  componentWillMount() {
    AsyncStorage.getItem('projects')
      .then(value => JSON.parse(value))
      .then(projects => projects && this.setState({ projects }))
  }

  componentWillUpdate(props, state) {
    AsyncStorage.setItem('projects', JSON.stringify(state.projects))
  }

  addProject() {
    this.setState({
      projects: [...this.state.projects, {
        background: color.random(this.state.projects.map(project => project.background)),
        id: this.state.projects.length ? this.state.projects[this.state.projects.length - 1].id + 1 : 1,
      }]
    })
  }

  deleteProject(id) {
    this.setState({ projects: this.state.projects.filter(project => project.id != id) })
  }

  setTitle(id, title) {
    const project = this.state.projects.reduce((match, project) => project.id === id ? project : match)
    const index = this.state.projects.indexOf(project)
    const projects = [
      ...this.state.projects.slice(0, index),
      {...project, title },
      ...this.state.projects.slice(index + 1)
    ]

    this.setState({ projects })
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Text style={styles.heading}>Side projects</Text>
          {this.state.projects.map(project => (
            <Project key={project.id} onSubmit={event => this.setTitle(project.id, event.nativeEvent.text)} onDelete={() => this.deleteProject(project.id)} onPress={() => this.props.navigation.navigate('Project', { project })} {...project} />
          ))}
          <TouchableHighlight style={[styles.box, styles.boxAdd]} onPress={() => this.addProject()}>
            <Text style={[styles.boxText, { marginBottom: 0 }]}>+ Add new project</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 3,
    marginBottom: 10,
    padding: 25,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.15,
  },
  boxAdd: {
    alignItems: 'center',
    backgroundColor: 'lightslategrey',
    display: 'flex',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 40,
  },
  heading: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 30,
  },
  progressBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 4,
    height: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    width: '80%',
  },
})

export default App = createStackNavigator({
  Home: { screen: HomeScreen },
  Project: { screen: ProjectScreen },
}, { headerMode: 'none' });
