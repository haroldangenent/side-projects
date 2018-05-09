import colors from 'css-color-names'
import Color from 'color'

const colorNames = Object.keys(colors)

export default {
  contrast(color) {
    return (new Color(color)).isLight() ? '#000' : '#fff'
  },
  random(exclusions = []) {
    let color

    do {
      color = colorNames[Math.floor(Math.random() * colorNames.length)]
    } while (colorNames.length > exclusions.length && exclusions.indexOf(color) != -1)

    return color
  }
}
