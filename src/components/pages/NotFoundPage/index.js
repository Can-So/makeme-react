import React from 'react'

import { PageTemplate, Header, Footer, Heading, Image } from 'components'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import Paper from 'material-ui/Paper'

const paperStyle = {
  flex: 1,
  padding: '.2rem .7rem .9rem .7rem',
}

const NotFoundPage = () => {
  return (
    <PageTemplate header={<Header />} footer={<Footer />}>
      <Paper zDepth={1} style={paperStyle}>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={6} lg={12}>
            <div style={{margin: 'auto', width: '30%'}}>
              <Heading>That Was Not Found</Heading>
              <Image src={'http://www.clker.com/cliparts/f/G/d/N/J/q/monster-pac.svg'} height={'300px'} />
              </div>
            </Col>
          </Row>
        </Grid>
      </Paper>
    </PageTemplate>
  )
}

export default NotFoundPage
