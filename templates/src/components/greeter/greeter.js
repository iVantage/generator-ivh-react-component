
import React from 'react'
import PropTypes from 'prop-types'
import './<%= moduleName %>.css'

const propTypes = {
  moniker: PropTypes.string
}

const defaultProps = {
  moniker: 'World'
}

const <%= className %> = (props) => {
  return (
    <h1 className='<%= className %>'>
      Hello, {props.moniker}
    </h1>
  )
}

<%= className %>.propTypes = propTypes
<%= className %>.defaultProps = defaultProps

export default <%= className %>
