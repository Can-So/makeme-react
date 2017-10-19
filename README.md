## Makeme-react PRE-release
A Redux & React app for people who need to get started fast.
> Pre-release version with example

## Download

Just clone the repository folder:

```sh
$ git clone -b universal https://github.com/thinq4yourself/makeme-react/src bt-app
$ cd bt-app
$ yarn install # or npm install
```

## Usage

- [Run](#run)
- [Deploy](#deploy)
- [Source code](#source-code)
- [Components](#components)
- [Containers](#containers)
- [Store](#store)
  - [Store naming conventions](#store-naming-conventions)
- [Styling & Theming](#styling)

> You can also refer to the [documentation](./documentation) directory for more in depth docs.

### Run

Once the dependencies are installed, use `npm start` to run a development server.

```sh
$ yarn start # or npm start
```

### Deploy

Use `npm run build` to build the code into the `dist` folder. 

```sh
$ yarn build # npm run build
```

# commit and push the files
```sh
$ git add -A
$ git commit -m "My commit notes"
$ git push origin my-feature-branch
```

---

### Source code

- The source code should stay in `src`
- `static` files should stay in `public` so they can be included in the build process.

Because of [webpack's config](https://github.com/thinq4yourself/betterup-test/webpack.config.js#L19-L21), we can import our source modules without relative paths.
```js
import { Button, HomePage } from 'components' // src/components
import App from 'components/App' // src/components/App
import routes from 'routes' // src/routes
```

---

### Components

If you want to create a component and don't know where to put it (`elements`, `modules`, ` views` etc.), **do not worry, do not think too much, just put it anywhere**. After you realize what it is, just move the component folder to the right place. Everything else should work.

This is possible because all components are dynamically exported on [`src/components/index.js`](src/components/index.js) and imported in a way that the structure doesn't matter:

```js
import { Button, HomePage, PageTemplate } from 'components'
```

To better understand this methodology, you can refer to the [`src/components`](src/components) folder. Basically, you can think this way:

- An **element** is a native html tag or a React Component that renders an html tag (e.g [`Input`](src/components/elements/Input/index.js));
- A **module** is a group of elements (e.g. [`Field`](src/components/modules/Field/index.js));
- An **views** are a group of elements, modules and/or other collections (e.g. [`Form`](https://github.com/thinq4yourself/betterup-test/src/components/organisms/PostForm/index.js));
- A **page** is... a page, where you will put mostly views (e.g. [`HomePage`](src/components/pages/HomePage/index.js));
- A **template** is a layout to be used on pages.

---

### Containers

This app usedW a very straight approach of Redux: all components should be as [pure](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.ly1b33jnz) as possible and should be placed in the `components` folder.

If, for some reason, we need to connect a component to the store, we just create a container with the same name, import the pure component and connect it. Thus having a nice separation of concerns. Easy peasy.

> __**Do not add any extra styles or another presentational logic in containers**__.

Example (`post`):

**src/components/modules/PostList**
```js
// just presentational logic
import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Post } from 'components'

const PostList = ({ list, loading, ...props }) => {
  return (
    <div {...props}>
      {loading && <div>Loading</div>}
      {list.map((post, i) => <Post key={i} {...post} />)}
    </div>
  )
}

PostList.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool
}

export default PostList
```

**src/containers/PostList**
```js
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fromPost, fromStatus } from 'store/selectors'
import { dostList, DONOR_LIST } from 'store/actions'

import { PostList } from 'components'

class PostListContainer extends Component {
  componentDidMount () {
    this.props.request()
  }

  render () {
    const { list, loading } = this.props
    return <PostList {...{ list, loading }} />
  }
}

const mapStateToProps = (state) => ({
  list: fromPost.getList(state),
  loading: fromStatus.isLoading(state, POST_LIST)
})

const mapDispatchToProps = (dispatch, { limit }) => ({
  request: () => dispatch(PostList.request(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
```

**src/components/elsewhere**
```js
import { PostList } from 'containers'

<PostList limit={15} />
```

This approach makes it easier to transform any pure component into a container at any time.

---

### Store

Here lives all the state management of the app.

- `actions` are the messages dispatched throughout the application to perform state changes. [Learn more](http://redux.js.org/docs/basics/Actions.html);
- `reducer` listens to the actions and translates the state changes to the store. [Learn more](http://redux.js.org/docs/basics/Reducers.html);
- `selectors` are used by the application to get parts of the current state. [Learn more](http://redux.js.org/docs/recipes/ComputingDerivedData.html);
- `sagas` listen to the actions and are responsible for performing side effects, like data fetching, caching etc. [Learn more](https://github.com/yelouafi/redux-saga).

To add a new store, we just create a new folder with actions, reducer, selectors and/or sagas. Webpack will automatically import them to the project  (boom!)

> How? See [`src/store/actions.js`](src/store/actions.js), [`src/store/reducer.js`](src/store/reducer.js), [`src/store/sagas.js`](src/store/sagas.js) and [`src/store/selectors.js`](src/store/selectors.js)).

#### Store naming conventions

The store follows some naming conventions. 

- `actions` starts with the store name (e.g. `MODAL_OPEN` for `modal` store, `DONOR_LIST_REQUEST` for `donor` store) and ends with `REQUEST`, `SUCCESS` or `FAILURE` if this is an async operation;
- `action creators` has the same name of their respective actions, but in camelCase (e.g. `modalOpen`). Async actions group `request`, `success` and `failure` in a object (e.g. `donorList.request`, `donorList.success`, `donorList.failure`);
- `worker sagas` start with the operation name (e.g. `openModal`, `requestDonorList`).

---

## Styling
The Webpack config supports CSS style loading (`style-loader`) so that files that can be used for overrides and custom classes on components as opposed to inline Javscript (JSX) for each component.  


### Styled Components
This app uses [`styled-components`](https://styled-components.com/) to lay a base style foundation and derive a sample layout and grid system. It also has a few more common components to work with out of `styled-components`, in order to make light and easy work for repetitive tasks (like building pages and templates).

Utilising tagged template literals and the power of CSS, `styled-components` allows you to write actual CSS code to style components. It also removes the mapping between components and styles – using components as a low-level styling construct is very easy this way. 

Styled Components makes it [is easy to work with CSS](https://github.com/styled-components/styled-components/blob/master/docs/css-we-support.md) and provides the ability to stay flexible with [other CSS in the app](https://github.com/styled-components/styled-components/blob/master/docs/existing-css.md).

Here are [some tips and tricks](https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md) for working with Styled Components (advanced). 

#### Example
To see an example of styling `styled-components` in action - see how we're using tagged template literals to write CSS for our [main layout template (`PageTemplate`)(https://github.com/thinq4yourself/betterup-test/src/components/templates/PageTemplate/index.js):

```javascript
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f1f0ee;
`

const Header = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
`

const Hero = styled.section``

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 6rem auto 2rem auto;
  max-width: 90%;
`

const Footer = styled.footer`
  margin-top: auto;
```

### Material UI
As an example of using Redux-Form and Google's material design, there is included here a fairly robust set of React Components, as a way to show how to integrate such libraries. All of the Material-UI components have their styles defined inline. You can see this presentation discussing CSS in JS for more help in understanding this. You can also see why they re moving away from this approach. 

To focus on custom styling the Material UI components, you have two methods:

1. [Overriding with Inline Styles](http://www.material-ui.com/#/customization/styles#overriding-with-inline-styles)
2. [Overriding with CSS Styles](http://www.material-ui.com/#/customization/styles#overriding-with-css-styles)

> I prefer method 2 (example below), but 1 is just as effective and may be less problematic (does not require any Webpack config or special loaders at runtime).

#### Examples:
#### I. Inline approach
Here we have some inline examples:

```javascript
const buttonStyle = {
  margin: 12,
}

const styles = {
  customWidth: {
    width: 100,
  },
}

...
render ({
...

<Field
  name='Title'
  component={SelectField}
  hintText='Title'
  floatingLabelText='Title'
  validate={isRequired}
  style={styles.customWidth} // this is how the customWidth style (above) is applied at the component level
  autoWidth={true}
>
  <MenuItem value='Mr' primaryText='Mr'/>
  <MenuItem value='Mrs' primaryText='Mrs'/>
  <MenuItem value='Ms' primaryText='Ms'/>
  <MenuItem value='Dr' primaryText='Dr'/>
</Field>

...

...

<RaisedButton icon={<NavigationCancel />} labelPosition="after" label='Clear' style={buttonStyle} onTouchTap={reset} disabled={pristine || submitting} /> // this is how the buttonStyle style (above) is applied at the component level

...

)
```

#### CSS approach:
In a component you may want to have a `_styles.css` sheet available which can be imported, so any changes to it will automatically get imported and applied to the Material UI components (or other html/component/DOM objects).

```css
/* Pure CSS overrides & customization */
form h2 {color: #e2001a}
```

> Here we simply change the color of an H2 tag. 

##### Try it for yourself:
> 1. Update latest from source `$ git pull origin master`
> 2. `$ cd frontend && npm start` to start the app running and browse to http://localhost:3000
> 3. Create and open component_name/_styles.css
> 4. Update some CSS in that file... 
> 5. See the updated styles live reloaded in browser (localhost:3000)


### Theming
Theming is a first class citizen in the app - and two global themes are provided to see how this can work - one for the base layout and top level components like page, header, footer, etc (`styled-components`), and one for the interaction and for (state) components (`material-ui`). Both use theme providers to support theme configuration and abstraction, as well as cascading ovverrides. 

- Read the [Material UI Theming](http://www.material-ui.com/#/customization/themes) guide. 
- Read the [Styled Components Theming](https://github.com/styled-components/styled-components/blob/master/docs/theming.md) guide. 

#### Styled Components Theme: 
The Styled Theme Provider config is located in:
- [/src/components/themes/default.js](https://github.com/thinq4yourself/betterup-test/src/components/themes/default.js)

#### Material UI Theme: 
The MUI Theme Provider config is located in:
- [/src/components/themes/default-material.js](https://github.com/thinq4yourself/betterup-test/src/components/themes/default-material.js)

---