import { reversePalette } from 'styled-theme/composer'

const theme = {}

theme.palette = {
  primary: ['#1098AD', '#5073B8', '#07B39B', '#F6AF93'],
  secondary: ['#000000', '#6DBA82', '#878787', '#B3B3B3'],
  danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
  alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
  success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
  grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#f1f0ee', '#ffffff'],
  white: ['#fff', '#fff', '#eee'],
}

theme.reversePalette = reversePalette(theme.palette)

theme.fonts = {
  primary: 'Roboto, Helvetica Neue, Helvetica, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
}

theme.flexboxgrid = {
  // Defaults
  gutterWidth: 1, // rem
  outerMargin: 1, // rem
  container: {
    sm: 46, // rem
    md: 61, // rem
    lg: 76,  // rem
  },
  breakpoints: {
    xs: 0,  // em
    sm: 48, // em
    md: 64, // em
    lg: 75,  // em
    }
}

export default theme
