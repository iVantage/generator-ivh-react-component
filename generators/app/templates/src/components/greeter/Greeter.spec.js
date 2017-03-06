
import React from 'react'
import { shallow } from 'enzyme'
import <%= className %> from './<%= className %>'

describe('<<%= className %> />', function() {
  it('should greet the given moniker', function() {
    const wrapper = shallow(<<%= className %> moniker="iVantage" />)
    expect(wrapper.text()).toEqual('Hello, iVantage')
  })

  it('should greet the world by default', function() {
    const wrapper = shallow(<<%= className %> />)
    expect(wrapper.text()).toEqual('Hello, World')
  })

  it('should greet loudly', function() {
    const wrapper = shallow(<<%= className %> />)
    expect(wrapper.is('h1')).toEqual(true)
  })
})
