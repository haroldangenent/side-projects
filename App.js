import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableHighlight, TextInput } from 'react-native';

const Project = ({ background, color = 'white', title }) => (
  <View style={[styles.box, { backgroundColor: background }]}>
    {title ? (
      <Text style={[styles.boxText, { color: color }]}>{title}</Text>
    ) : (
      <TextInput style={[styles.boxText, { color: color }]} placeholder="Your project name" />
    )}
    <View style={styles.progressBar}>
      <View style={[styles.progressBarFill, { backgroundColor: color }]} />
    </View>
  </View>
)

export default class App extends React.Component {
  state = {
    projects: [
      {
        background: 'mediumspringgreen',
        id: 1,
        title: 'Building furniture',
      },
      {
        background: 'papayawhip',
        color: 'black',
        id: 2,
        title: 'Chopping wood',
      },
      {
        background: 'dodgerblue',
        id: 3,
        title: 'Learn the flute',
      },
    ]
  }

  addProject() {
    this.setState(prevState => ({
      projects: [...prevState.projects, {
        background: 'peachpuff',
        id: prevState.projects[prevState.projects.length - 1].id + 1,
      }]
    }));
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Text style={styles.heading}>Side projects</Text>
          {this.state.projects.map(project => (
            <Project key={project.id} {...project} />
          ))}
          <TouchableHighlight style={[styles.box, styles.boxAdd]} onPress={() => this.addProject()}>
            <Text style={[styles.boxText, { marginBottom: 0 }]}>+ Add new project</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
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
});
