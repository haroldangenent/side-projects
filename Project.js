import React from 'react'
import Heading from './Heading'
import Container from './Container'
import color from './color'

export default class Project extends React.Component {
  render() {
    const { project } = this.props.navigation.state.params

    return (
      <Container style={{ backgroundColor: project.background }}>
        <Heading style={{ color: color.contrast(project.background) }}>{project.title}</Heading>
      </Container>
    )
  }
}
