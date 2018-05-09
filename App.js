import { createStackNavigator } from 'react-navigation'
import Home from './Home'
import Project from './Project'

export default App = createStackNavigator({
  Home: { screen: Home },
  Project: { screen: Project },
}, { headerMode: 'none' })
