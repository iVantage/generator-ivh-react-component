
import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import <%= className %> from './<%= className %>'

describe('<<%= className %> />', () => {
  it('should greet the given moniker', () => {
    const wrapper = shallow(<<%= className %> moniker="iVantage" />)
    expect(wrapper.text()).to.equal('Hello, iVantage')
  })

  it('should greet the world by default', () => {
    const wrapper = shallow(<<%= className %> />)
    expect(wrapper.text()).to.equal('Hello, World')
  })

  it('should greet loudly', () => {
    const wrapper = shallow(<<%= className %> />)
    expect(wrapper.is('h1')).to.equal(true)
  })
})

