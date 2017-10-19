## Testing

## Testing Components
This app uses [Jest](http://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/) for testing components.

Each test file lives inside the component folder with a standard name (`index.test.js`). That's a basic and common test:
```jsx
import React from 'react'
import { shallow } from 'enzyme'
import Component from '.'

it('renders children when passed in', () => {
  const wrapper = shallow(<Component>test</Component>)
  expect(wrapper.contains('test')).toBe(true)
})
```

All components except the one being tested are mocked in [`test/componentsMock.js`](https://github.com/thinq4yourself/makeme-react/blob/master/src/test/componentsMock.js). That makes it easier to write real unit tests.

---

## Testing-Redux

In short:
> Dispatch action `foo`, expect state to be `bar` after some time, no matter what happened in the middle.
```js
dispatch(resourceCreateRequest({ title: 'foo' }))
await delay(100)
expect(getList(getState())).toEqual([
  { title: 'foo' },
])
```
<sup>See [src-example/store/resource/test.js](https://github.com/thinq4yourself/makeme-react/blob/master/src/store/resource/test.js)</sup>

Unit testing Redux is very easy, but that's often too much work, repetitive and sometimes it's impossible to do [TDD](https://en.wikipedia.org/wiki/Test-driven_development). In other words, it can be hard to write tests before writing actual code because tests are very coupled to their implementations.

In addition, many teams working on quickly evolving projects will prefer to not write unit tests because requirements and implementations change very fast.

Writing integration tests for [redux modules](./Redux.md) is an alternative solution for that.

Happy TDD'ing 😊
