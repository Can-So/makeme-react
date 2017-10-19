# Redux
..is awesome. But a hige PITA compared to MobX. This app is intended for scalable teams and complex apps, so we use Redux.

## API Service

The API service ([`src/services/api`](https://github.com/thinq4yourself/makeme-react/blob/master/src/services/api/index.js)) is a convenient wrapper around [`fetch`](https://github.com/github/fetch).

### Basic usage
```js
import api from 'services/api'

// calling directly
api.post('/posts', { title: 'Hello, World!' })
   .then(data => console.log(data.title))
   .catch(...)

// or in a worker saga
const data = yield call([api, api.post], '/posts', { title: 'Hello, World!' })
```

As you can see, we don't need to specify the API domain. It'll automatically prepend `apiUrl` set in [`src/config.js`](https://github.com/thinq4yourself/bmakeme-react/blob/master/src/config.js#L6). But you can, of course, pass any API domain:

```js
api.get('https://jsonplaceholder.typicode.com/posts')
```

### Setting access tokens

Another way to use that is by creating an API instance so we can set a state (like `access tokens`) once and use it within the application:
```js
const apiInstance = api.create()

apiInstance.setToken('123456')

// these requests will be sent with `Authorization: Bearer 123456` header
apiInstance.post('/posts', { title: 'Hello, World!' })
apiInstance.get('/posts/1')

// these requests will be sent with no custom headers
api.post('/posts', { title: 'Hello, World!' })
api.get('/posts/1')
```

---

## Containers

This uses a very straight forward approach to Redux: all components should be as [pure](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.ly1b33jnz) as possible and are placed in the `components` folder.

If in question, you can refer to [this thread](https://twitter.com/dan_abramov/status/668585589609005056) on Twitter from the creator of Redux:
<p align="center"><img alt="Dan Abramov Redux Tweet" src="https://cloud.githubusercontent.com/assets/3068563/19958100/77ca1b68-a183-11e6-887e-a491dc783f43.png"></p>

Example:

**src/components/views/PostList**
```jsx
// just presentational logic
const PostList = ({ list, loading, ...props }) => (
  <div {...props}>
    {loading && <div>Loading</div>}
    {list.map((post, i) => <Post key={i} {...post} />)}
  </div>
)

export default PostList
```

**src/containers/PostList**
```jsx
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
  request: () => dispatch(postList.request(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
```

**src/components/elsewhere**
```js
import { PostList } from 'containers'

<PostList limit={15} />
```

This approach makes it easier to transform any pure component into a container at any time. 

Happy pure component'ing 😊

---

## Redux Modules

This app uses a modular approach to better organize Redux parts. It was inspired by [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux). However, this handles not only `actions` and `reducers`, but also `selectors`, `sagas`, `middlewares` etc.

In short, a Redux module is:

- **A feature** with action creators, reducer, selectors, sagas, middlewares and any other part from the Redux ecosystem;
- **Complete**, which means that one feature will not be separated into multiple modules;
- **Pluggable**, which means that we can always add or remove it to have or not that feature without having to change other Redux modules.

A Redux module tree looks like this:

```sh
src/store
├── entities # handles normalizr
│   ├── middleware.js
│   ├── middleware.test.js
│   ├── reducer.js
│   ├── reducer.test.js
│   ├── schemas.js
│   ├── selectors.js
│   └── selectors.test.js
├── post # handles some posts
│   ├── actions.js
│   ├── actions.test.js
│   ├── reducer.js
│   ├── reducer.test.js
│   ├── sagas.js
│   ├── sagas.test.js
│   ├── selectors.js
│   └── selectors.test.js
├── status # handles loading/error status
│   ├── reducer.js
│   ├── reducer.test.js
│   ├── selectors.js
│   └── selectors.test.js
├── actions.js # exports all actions from all modules
├── configure.js # configures the store
├── middlewares.js # exports all middlewares from all modules
├── reducer.js # exports the root reducer using all modules
├── sagas.js # exports the root saga using all modules
└── selectors.js # exports all selectors from all modules
```

Happy Redux module'ing 😊

---

## Actions

Actions are plain objects dispatched by the application (usually from [`containers`](./Containers)) that describe changes on the store. [`Reducers`](#Reducers) and [`sagas`](#Sagas) listen to it so they can perform state changes and side effects, respectively, within the store.

A simple action looks like:
```js
{
  type: 'POST_UPDATE',
  payload: {
    needle: 1, 
    data: {
      title: 'Hi there React peep!',
    },
  },
}
```

Sine this uses action type constants and action creator methods to create those action objects following the [Flux Standard Action](https://github.com/acdlite/flux-standard-action) pattern (FSA), it looks like this:
```js
// src/store/post/actions.js
export const POST_UPDATE = 'POST_UPDATE'

export const postUpdate = (needle, data) => ({
  type: POST_UPDATE,
  payload: {
    needle,
    data,
  },
})
```

That way, other parts of the app, usually containers, can dispatch that action:
```js
// src/containers/PostList.js
import { postUpdate } from 'store/actions'

store.dispatch(postUpdate(1, { title: 'Hi!' }))
```

### Actions are APIs 🚀

Actions are the way for [`containers`](./Containers) to do things on the store. Ideally, when writing containers, the only things we will need to know is the action creator signature (`postUpdate(needle, data)`) and how to access the state through [`selectors`](#Selectors) (`fromPost.getList(state)`). What happens in the middle ([`sagas`](#Sagas), [`reducers`](#Reducers), [`API calls`](#API-service) etc.) doesn't matter.

Consider the following action creator:
```js
// bad
const postUpdate = payload => ({
  type: POST_UPDATE,
  payload,
})
```

The problem with that is that when dispatching `postUpdate` from containers we don't know what we need to pass to `payload`. We will need to read sagas and/or reducers to figure it out. It's a good practice to provide the API on the action creator signature:

```js
// good
const postUpdate = (needle, data) => ({
  type: POST_UPDATE,
  payload: { 
    needle, 
    data, 
  },
})
```

### Naming conventions

Actions and action creators don't perform any change by themselves. Therefore, it doesn't make sense to name them imperatively like `updatePost`. If it was the case, it would be more descriptive to name it like `createPostUpdateAction`.

To make things simpler but stay descriptive, let's try and follow these naming conventions:
 - Action types are named as `MODULE_ACTION`. e.g. `POST_UPDATE`, `POST_UPDATE_REQUEST`;
 - Action creators are the same name as their action type, but camelCased. e.g. `postUpdate`, `postUpdateRequest`.

This way, we can read it like *"store dispatches a post update request on post 1 changing its title to 'Hi  React Peeps!'"!*

### Unit testing actions

As pure functions, action creators are very easy to unit test:
```js
test('postUpdateRequest', () => {
  expect(postUpdateRequest(1, { title: 'Hi!' })).toEqual({
    type: 'POST_UPDATE_REQUEST',
    payload: {
      needle: 1,
      data: { 
        title: 'Hi!',
      },
    },
  })
})
```

Happy Action'ing 😊

---

Reducers are pure functions which are called sequentially when some [`action`](#Actions) is `dispatch`ed. With them we can perform state changes based on the dispatched action.

A simple reducer will look like this:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_CREATE':
      return {
        ...state,
        list: [action.data, ...state.list],
      }
    default:
      return state
  }
}
```

### Unit testing reducers

As well as actions, reducers are pure functions and therefore very easy to unit test:
```js
test('POST_CREATE', () => {
  const state = {}
  const action = {
    type: 'POST_CREATE', 
    data: { title: 'Hi!' },
  }
  const expectedState = {
    list: [{ title: 'Hi!' }],
  }
  expect(reducer(state, action)).toEqual(expectedState)
})

```

Happy Reduce'ing 😊

---

## Sagas
This uses [`redux-saga`](https://github.com/redux-saga/redux-saga) to perform side effects based on `dispatch`ed actions.

Basically, we will see 3 types of sagas on `sagas.js` files: `root saga`, `watcher sagas` and `worker sagas`.

### Worker sagas

They are responsible for actually performing the side effects and, in response, dispatching another actions asynchronously. A simple worker saga will look like:
```js
export function* updatePost(needle, data) {
  try {
    const detail = yield call(api.put, `/posts/${needle}`, data)
    yield put(postUpdateSuccess(needle, detail)) // dispatches another action
  } catch (e) {
    yield put(postUpdateFailure(needle, e))
  }
}
```

### Watcher sagas

They are responsible for listening to dispatched actions and calling worker sagas in response to that:
```js
export function* watchPostUpdateRequest() {
  while (true) {
    const { needle, data } = yield take('POST_UPDATE_REQUEST')
    yield call(updatePost, needle, data)
  }
}
```

### Root saga

It just runs all watcher sagas in parallel:
```js
export default function* () {
  yield fork(watchPostCreateRequest)
  yield fork(watchPostListReadRequest)
  yield fork(watchPostDetailReadRequest)
  yield fork(watchPostUpdateRequest)
  yield fork(watchPostDeleteRequest)
}
```

### Unit testing sagas

Even though they perform side effects, sagas are written in a way that they can be considered as pure functions. And, such as [`actions`](#Actions) and [`reducers`](#Reducers), unit testing sagas is easy:
```js
test('updatePost', () => {
  const data = { id: 1 }
  const generator = updatePost(1, { title: 'foo' })
  expect(generator.next().value).toEqual(call(api.put, '/posts/1', { title: 'foo' }))
  expect(generator.next(data).value).toEqual(put(postUpdateSuccess(1, data)))
})
```

### Integration testing sagas

Writing unit tests for sagas is easy, but one could complain about it being too coupled to its implementation. That is, it's very hard to do [TDD](https://en.wikipedia.org/wiki/Test-driven_development) with it.

A solution could be writing integration tests instead of unit tests. With the help of [`redux-saga-test-plan`](https://github.com/jfairbank/redux-saga-test-plan), we can test the whole flow through the saga: 

```js
it('calls success', () => {
  // downside: we need to mock api
  const api = {
    put: (url, data) => Promise.resolve({ id: 1, ...data }),
  }
  // expect saga to call that endpoint and dispatch that action when I dispatch it
  return expectSaga(saga, api)
    .call([api, api.put], '/posts/1', { foo: 'bar' })
    .put(postUpdateSuccess(1, { id: 1, foo: 'bar' }))
    .dispatch(postUpdateRequest(1, { foo: 'bar' }))
    .run({ timeout: 20, silenceTimeout: true })
})
```

Happy Saga'ing 😊

---

## Selectors
If [`actions`](#Actions) are the entry points, selectors are the exit. After `dispatch`ing an action, the application can use selectors to get the resulting data from the store after [`reducers`](#Reducers) and [`sagas`](#Sagas) have done something with it.

Basically, we can use selectors to get some part of the current state. Here's some basic usage:

```js
// src/store/selectors.js
export const getPostList = state => state.post.list
```
```js
// src/containers/PostList.js
import { getPostList } from 'store/selectors'

const mapStateToProps = state => ({
  list: getPostList(state),
})
```

As you may have noticed, the selector above is defined outside of the post module directory. That's because the redux state tree is one single javascript plain object with all modules inside, like this:
```js
{
  post: {
    list: [],
  },
  status: {
    loading: [],
    error: [],
  },
  ...
}
```

 Modules themselves don't know their property names (`post`, `status`) on the root state because it's defined on `src/store/reducer.js`.

The solution is mapping all modules selectors in [`src/store/selectors.js`](https://github.com/thinq4yourself/makeme-react/blob/master/src/store/selectors.js) passing the respective property names to them, while, inside modules, we can create selectors based only on the module's state structure:
```js
// src/store/post/selectors.js
export const getList = state => state.list
```
```js
// src/store/selectors.js
// The real file has a more nifty algorithm
import { getList } from './post/selectors'
export const fromPost = {
  getList: state => getList(state.post)
}
```
```js
// src/containers/PostList.js
import { fromPost } from 'store/selectors'

const mapStateToProps = state => ({
  list: fromPost.getList(state),
})
```

### Unit testing selectors

```js
test('getList', () => {
  expect(getList({ list: [1, 2, 3] })).toEqual([1, 2, 3])
})
```

Happy Select'ing 😊

---

