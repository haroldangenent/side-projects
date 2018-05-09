import colors from 'css-color-names'
import contrast from 'contrast'

const colorNames = Object.keys(colors)

export default {
  contrast(color) {
    return contrast(colors[color]) === 'light' ? '#000' : '#fff'
  },
  random(exclusions = []) {
    let color

    do {
      color = colorNames[Math.floor(Math.random() * colorNames.length)]
    } while (colorNames.length > exclusions.length && exclusions.indexOf(color) != -1)

    return color
  }
}
