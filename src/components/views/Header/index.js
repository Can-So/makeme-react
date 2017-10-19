import React from 'react'
import styled from 'styled-components'

import { LogoImage, PrimaryNavigation, Block, Link } from 'components'

const Wrapper = styled(Block)`
  display: flex;
  align-items: center;
  padding: 1.6rem 1.79rem;

  & > :not(:first-child) {
    margin-left: 1rem;
  }
`

const StyledPrimaryNavigation = styled(PrimaryNavigation)`
  flex: 1
`

const Header = (props) => {
  return (
    <Wrapper opaque {...props}>
      <Link to="/">
        <LogoImage height={100} />
      </Link>
      <StyledPrimaryNavigation reverse />
    </Wrapper>
  )
}

export default Header
