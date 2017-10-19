import React from 'react'

import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { PageTemplate, Header, Footer, Heading, Paragraph, Button } from 'components'
import Paper from 'material-ui/Paper'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon'
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import { PostList } from 'containers'

import YouTube from 'react-youtube'
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

const videoId = 'GNZBSZD16cY'
const videoOpts = {
  height: '100%',
  width: '95%',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
}

const WelcomePage = () => {
  return (
    <PageTemplate header={<Header />} footer={<Footer />}>
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <YouTube
              videoId={videoId}
              id={videoId}
              opts={videoOpts}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Paper zDepth={1} style={paperStyle}>
              <StyledHeading level={2}>Hipster Ipsum</StyledHeading>
              <Text>
                Fam swag lumbersexual cray. Williamsburg poutine schlitz plaid air plant. Blog keffiyeh wayfarers, scenester bitters cornhole next level etsy roof party. Celiac tousled offal sustainable. Listicle green juice kickstarter heirloom, quinoa umami raw denim meh. 
              <br /><br />
                Schlitz truffaut PBR&B art party jean shorts hella. Taxidermy cold-pressed mumblecore, woke everyday carry you probably haven't heard of them next level vexillologist master cleanse lumbersexual ugh tote bag. 
              </Text>
              <Button to="/test" style={{display: 'flex'}}>See if you like</Button>
            </Paper>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Row style={{padding: '2rem 0'}}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <StyledHeading2 level={1}>Organic biodiesel 90's art party meditation</StyledHeading2>
              </Col>
            </Row>
            <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Card>
                <CardMedia
                  overlay={<CardTitle subtitle="Kinfolk farm-to-table prism" />}
                >
                  <img style={{height: '200px'}} src="http://d2436y6oj07al2.cloudfront.net/spff/previews/40062.jpg" />
                </CardMedia>
                <CardText style={cardTextStyle}>
                  Et roof party nisi, ugh beard dreamcatcher pour-over fashion axe mustache chillwave 90's kickstarter raclette williamsburg tofu. Ex pop-up reprehenderit aliqua seitan ramps. Artisan shoreditch hashtag woke, adipisicing air plant nesciunt duis polaroid hoodie mlkshk fingerstache. Yuccie photo booth sriracha PBR&B.
                </CardText>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Card>
                <CardMedia
                  overlay={<CardTitle subtitle=" Fingerstache meditation migas" />}
                >
                  <img style={{height: '200px'}} src="http://www.sueblimely.com/images/posts/2008/images-free-morning-glory.jpg" />
                </CardMedia>
                <CardText style={cardTextStyle}>
                  Ex twee pok pok offal kogi. Pinterest vinyl est unicorn, poke do lo-fi biodiesel ea shoreditch. . Microdosing fam neutra pinterest seitan, williamsburg unicorn keytar VHS artisan la croix street art helvetica succulents. Ethical franzen aesthetic farm-to-table woke.
                </CardText>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Card>
                <CardMedia
                  overlay={<CardTitle subtitle="VHS artisan la croix street art" />}
                >
                  <img style={{height: '200px'}} src="http://th01.deviantart.net/fs70/PRE/i/2013/081/0/4/spring_sunset___free_stock_image_by_kevron2001-d5yv3zn.jpg" />
                </CardMedia>
                <CardText style={cardTextStyle}>
                  Schlitz biodiesel XOXO, ea fugiat slow-carb polaroid magna. Austin craft beer poke tofu, cold-pressed iPhone brooklyn ut. Kogi typewriter vegan, try-hard migas post-ironic food truck pok pok viral knausgaard tumeric mlkshk yr kickstarter yuccie. Shoreditch keffiyeh deep v, whatever meditation tofu aesthetic.
                </CardText>
              </Card>
            </Col>
            </Row>
            <Row style={{padding: '2rem 0'}}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Button to="/test" style={{display: 'flex'}}>See if you like</Button>
              </Col>
            </Row>
            <Row style={{padding: '2rem 0'}}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <StyledHeading2 level={1}>Latest Posts</StyledHeading2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Card>
                  <CardText>
                    <PostList limit={15} />
                  </CardText>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </PageTemplate>
  )
}

export default WelcomePage
