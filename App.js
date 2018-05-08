import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';

const Project = ({ background, color = '#fff', title }) => (
  <View style={[styles.box, { backgroundColor: background }]}>
    <Text style={[styles.boxText, { color: color }]}>{title}</Text>
    <View style={styles.progressBar}>
      <View style={[styles.progressBarFill, { backgroundColor: color }]} />
    </View>
  </View>
)

export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Text style={styles.heading}>Side projects</Text>
          <Project background="#4fe292" title="Building furniture" />
          <Project background="papayawhip" color="#000" title="Chopping wood" />
          <Project background="dodgerblue" title="Learn the flute" />
          <View style={[styles.box, styles.boxAdd]}>
            <Text style={[styles.boxText, { marginBottom: 0 }]}>+ Add new project</Text>
          </View>
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
