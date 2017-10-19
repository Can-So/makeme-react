import React from 'react'
import { shallow } from 'enzyme'
import PostList from '.'

const list = [
  { id: 1, name: 'name 1', email: 'email 1' },
  { id: 2, name: 'name 2', email: 'email 2' },
  { id: 3, name: 'name 3', email: 'email 3' },
]

const wrap = (props = {}) => shallow(<PostList list={list} {...props} />)

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})

it('renders loading when passed in', () => {
  const wrapper = wrap({ loading: true })
  expect(wrapper.contains('Loading')).toBe(true)
})
