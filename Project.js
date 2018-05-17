import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, AsyncStorage, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Swipeable from 'react-native-swipeable'
import Heading from './Heading'
import Container from './Container'
import color from './color'
import Text, { css as textStyle } from './Text'

export default class Project extends React.Component {
  project = this.props.navigation.state.params.project
  contrast = color.contrast(this.project.background)
  state = {
    tasks: this.project.tasks || []
  }

  componentWillUpdate(props, state) {
    AsyncStorage.getItem('projects')
      .then(value => JSON.parse(value))
      .then(projects => projects.map(project => {
        if (project.id === this.project.id) {
          project.tasks = state.tasks
        }

        return project
      }))
      .then(newProjects => AsyncStorage.setItem('projects', JSON.stringify(newProjects)))
  }

  addTask(name) {
    if (!name) {
      this.input.blur()
      return
    }

    this.setState({
      tasks: [...this.state.tasks, {
        id: this.state.tasks.length ? this.state.tasks[this.state.tasks.length - 1].id + 1 : 1,
        name
      }],
      status: 'open',
    }, () => {
      this.input.focus()
    })
  }

  complete(id) {
    const task = this.state.tasks.reduce((match, task) => task.id === id ? task : match)
    const index = this.state.tasks.indexOf(task)
    const tasks = [
      ...this.state.tasks.slice(0, index),
      {...task, status: task.status === 'done' ? 'open' : 'done' },
      ...this.state.tasks.slice(index + 1)
    ]

    this.setState({ tasks })
  }

  delete(id) {
    this.setState({ tasks: this.state.tasks.filter(task => task.id != id) })
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: this.project.background }} contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <Heading style={{ color: this.contrast }}>{this.project.title}</Heading>
          {this.state.tasks.map(task => (
            <Swipeable key={task.id} rightContent={<View style={{ display: 'none' }} />} onRightActionRelease={() => this.delete(task.id)}>
              <TouchableOpacity onPress={() => this.complete(task.id)}>
                <Text style={[{ color: this.contrast }, task.status === 'done' ? {
                  opacity: .5,
                  textDecorationLine: 'line-through',
                } : {}]}>{task.name}</Text>
              </TouchableOpacity>
            </Swipeable>
          ))}
          <TouchableOpacity activeOpacity={1} style={styles.input} onPress={() => this.input.isFocused() ? this.input.blur() : this.input.focus()}>
            <TextInput
              key={`newTask-${this.state.tasks.length}`}
              style={[textStyle, { color: this.contrast }]}
              placeholder="+ Add task"
              returnKeyType="done"
              onSubmitEditing={event => this.addTask(event.nativeEvent.text)}
              clearOnFocus={true}
              ref={input => this.input = input}
            />
          </TouchableOpacity>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
  }
})
