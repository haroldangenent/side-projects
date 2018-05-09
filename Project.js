import React from 'react'
import Heading from './Heading'
import Container from './Container'

export default class Project extends React.Component {
  render() {
    const { project } = this.props.navigation.state.params

    return (
      <Container style={{ backgroundColor: project.background }}>
        <Heading>{project.title}</Heading>
      </Container>
    )
  }
}
