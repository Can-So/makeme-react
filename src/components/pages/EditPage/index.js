import React from 'react'

import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { PageTemplate, Header, Footer, Heading, Paragraph, Button } from 'components'
import Paper from 'material-ui/Paper'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { PostForm, PostList } from 'containers'

import styled, { css, injectGlobal } from 'styled-components'
import { palette } from 'styled-theme'

const paperStyle = {
  flex: 1,
  padding: '.2rem .7rem .9rem .7rem',
}
const paperStyle2 = {
  flex: 1,
  padding: '.5rem .7rem .9rem 4.2rem',
  marginTop: '2rem',
}
const cardTextStyle = {
  minHeight: '150px',
}

const StyledHeading = styled(Heading)`
  color: #222;
  margin: 1rem 1rem 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const StyledHeading2 = styled(Heading)`
  color: #222;
  margin: 1rem 1rem 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Text = styled(Paragraph)`
  color: #222;
  margin: 1rem auto;
  max-width: 800px;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.35em;
  letter-spacing: 0.07em;
  @media screen and (max-width: 640px) {
    font-size: 1rem;
  }
`

const EditPage = () => {
  return (
    <PageTemplate header={<Header />} footer={<Footer />}>
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Paper zDepth={1} style={paperStyle}>
              <PostForm />
            </Paper>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Paper zDepth={1} style={paperStyle}>
              <StyledHeading level={2}>Post list</StyledHeading>
              <PostList limit={15} />
            </Paper>
          </Col>
        </Row>
      </Grid>
    </PageTemplate>
  )
}

export default EditPage
