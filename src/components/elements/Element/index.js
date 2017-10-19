import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Element = styled.span`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
`

Element.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Element.defaultProps = {
  palette: 'grayscale',
}

export default Element
