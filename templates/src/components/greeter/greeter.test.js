/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import <%= className %> from './<%= moduleName %>'

describe('<<%= className %> />', () => {
  it('should greet the given moniker', () => {
    const wrapper = shallow(<<%= className %> moniker='iVantage' />)
    expect(wrapper.text()).toEqual('Hello, iVantage')
  })

  it('should greet the world by default', () => {
    const wrapper = shallow(<<%= className %> />)
    expect(wrapper.text()).toEqual('Hello, World')
  })

  it('should greet loudly', () => {
    const wrapper = shallow(<<%= className %> />)
    expect(wrapper.is('h1')).toEqual(true)
  })
})
