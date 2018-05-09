import React from 'react'
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableHighlight, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import color from './color'

const Project = ({ background, onSubmit, title }) => (
  <View style={[styles.box, { backgroundColor: background }]}>
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
)

export default class App extends React.Component {
  state = {
    projects: []
  }

  addProject() {
    this.setState({
      projects: [...this.state.projects, {
        background: color.random(this.state.projects.map(project => project.background)),
        id: this.state.projects.length ? this.state.projects[this.state.projects.length - 1].id + 1 : 1,
      }]
    })
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
            <Project key={project.id} onSubmit={event => this.setTitle(project.id, event.nativeEvent.text)} {...project} />
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
