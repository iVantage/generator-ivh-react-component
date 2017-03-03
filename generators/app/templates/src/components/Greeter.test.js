
import React from 'react'
import { shallow } from 'enzyme'
import <%= className %> from './<%= className %>'

describe('<<%= className %> />', function() {
  it('should greet the given moniker', function() {
    const wrapper = shallow(<<%= className %> moniker="iVantage" />)
    expect(wrapper.text()).to.equal('Hello, iVantage')
  })

  it('should greet the world by default', function() {
    const wrapper = shallow(<<%= className %> />)
    expect(wrapper.text()).to.equal('Hello, World')
  })

  it('should greet loudly', function() {
    const wrapper = shallow(<<%= className %> />)
    expect(wrapper.is('h1')).to.equal(true)
  })
})

