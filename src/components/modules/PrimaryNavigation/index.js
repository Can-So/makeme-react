import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import NoteAddIcon from 'material-ui/svg-icons/action/note-add'

import { Link } from 'components'

const Nav = styled.nav`
  display: block;
  text-align: right;
  list-style: none;
  > :not(:first-child) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  li {display: inline;}
  a {
    font-weight: 400;
    color: ${palette('grayscale', 3)};
    font-size: 1.05rem;
    &.active {
      color: ${palette('grayscale', 8)};
    }
  }
`

const styles = css`
  display: inline-block;
  background-image: linear-gradient(90deg, #F79533 0%, #F37055 15%, #EF4E7B 30%, #A166AB 44%, #5073B8 58%, #1098AD 72%, #07B39B 86%, #6DBA82 100%);
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`
const AddLink = styled(({ theme, reverse, palette, ...props }) =>
  <Link {...props} />
)`${styles}`

const PrimaryNavigation = (props) => {
  return (
    <Nav {...props}>
      <li><AddLink to="/test" onlyActiveOnIndex activeClassName="active"><NoteAddIcon /></AddLink></li>
    </Nav>
  )
}

PrimaryNavigation.propTypes = {
  reverse: PropTypes.bool,
}

export default PrimaryNavigation
