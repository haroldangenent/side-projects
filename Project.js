import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Heading from './Heading'
import Container from './Container'
import color from './color'
import Text, { css as textStyle } from './Text'

export default class Project extends React.Component {
  state = {
    tasks: []
  }
  project = this.props.navigation.state.params.project
  contrast = color.contrast(this.project.background)

  addTask(name) {
    if (!name) {
      this.input.blur()
      return
    }

    this.setState({
      tasks: [...this.state.tasks, {
        id: this.state.tasks.length ? this.state.tasks[this.state.tasks.length - 1].id + 1 : 1,
        name
      }]
    }, () => {
      this.input.focus()
    })
  }

  render() {
    return (
      <Container style={{ backgroundColor: this.project.background }}>
        <Heading style={{ color: this.contrast }}>{this.project.title}</Heading>
        {this.state.tasks.map(task => (
          <Text key={task.id}>{task.name}</Text>
        ))}
        <TouchableOpacity activeOpacity={1} style={styles.input} onPress={() => this.input.focus()}>
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
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
  }
})
