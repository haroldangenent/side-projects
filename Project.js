import React from 'react'
import { TextInput } from 'react-native'
import Heading from './Heading'
import Container from './Container'
import color from './color'
import { css as textStyle } from './Text'

export default class Project extends React.Component {
  project = this.props.navigation.state.params.project
  contrast = color.contrast(this.project.background)

  render() {
    return (
      <Container style={{ backgroundColor: this.project.background }}>
        <Heading style={{ color: this.contrast }}>{this.project.title}</Heading>
        <TextInput style={[textStyle, { color: this.contrast }]} placeholder="Add task" />
      </Container>
    )
  }
}
