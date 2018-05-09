import colors from 'css-color-names'

const colorNames = Object.keys(colors)

export default {
  random(exclusions = []) {
    let color

    do {
      color = colorNames[Math.floor(Math.random() * colorNames.length)]
    } while (colorNames.length > exclusions.length && exclusions.indexOf(color) != -1)

    return color
  }
}
