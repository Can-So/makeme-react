import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { WelcomePage, EditPage, NotFoundPage } from 'components'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage} />
    <Route path="/test" component={EditPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)

export default routes
