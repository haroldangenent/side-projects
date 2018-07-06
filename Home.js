import React from 'react'
import { StyleSheet, View, ScrollView, StatusBar, TouchableHighlight, TextInput, AsyncStorage, Animated } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import color from './color'
import Swipeable from 'react-native-swipeable'
import Heading from './Heading'
import Container from './Container'
import Text, { css as textStyle } from './Text'

class Project extends React.Component {
  state = {
    completed: new Animated.Value(this.getCompleted()),
  }

  componentDidUpdate(prevProps) {
    if (this.getCompleted(prevProps) != this.getCompleted()) {
      Animated.timing(this.state.completed, {
        duration: 250,
        toValue: this.getCompleted(),
      }).start()
    }
  }

  getCompleted(props = null) {
    return (props || this.props).tasks.filter(task => task.status === 'done').length / (props || this.props).tasks.length
  }

  render() {
    const { background, tasks, onDelete, onPress, onSubmit, title } = this.props

    return (
      <Swipeable rightContent={<View style={{ display: 'none' }} />} onRightActionRelease={onDelete}>
        <TouchableHighlight underlayColor={color.darken(background)} style={[styles.box, { backgroundColor: background }]} onPress={onPress}>
          <View>
            {title ? (
              <Text style={{ color: color.contrast(background) }}>{title}</Text>
            ) : (
              <TextInput
                style={[textStyle, { color: color.contrast(background) }]}
                placeholder="Your project name"
                returnKeyType="done"
                onSubmitEditing={onSubmit}
              />
            )}
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressBarFill, {
                backgroundColor: color.contrast(background),
                width: this.state.completed.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }]} />
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    )
  }
}

export default class Home extends React.Component {
  state = {
    projects: [],
  }

  componentWillMount() {
    this.getData()
    this.props.navigation.addListener('didFocus', () => this.getData())
  }

  componentWillUpdate(props, state) {
    AsyncStorage.setItem('projects', JSON.stringify(state.projects))
  }

  getData() {
    AsyncStorage.getItem('projects')
      .then(value => JSON.parse(value))
      .then(projects => projects && this.setState({ projects }))
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
        <Container>
          <StatusBar hidden={true} />
          <Heading>Side projects</Heading>
          {this.state.projects.map(project => (
            <Project key={project.id} onSubmit={event => this.setTitle(project.id, event.nativeEvent.text)} onDelete={() => this.deleteProject(project.id)} onPress={() => this.props.navigation.navigate('Project', { project })} {...project} />
          ))}
          <TouchableHighlight style={[styles.box, styles.boxAdd]} onPress={() => this.addProject()}>
            <Text style={{ marginBottom: 0 }}>+ Add new project</Text>
          </TouchableHighlight>
        </Container>
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
  progressBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 4,
    height: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
})
