
import React from 'react'
import PropTypes from 'prop-types'

import './<%= className %>.css'

const propTypes = {
  moniker: PropTypes.string
}

const defaultProps = {
  moniker: 'World'
}

class <%= className %> extends React.Component {
  render() {
    const moniker = this.props.moniker
    return (
      <h1 className="<%= className %>">Hello, {moniker}</h1>
    )
  }
}

<%= className %>.propTypes = propTypes
<%= className %>.defaultProps = defaultProps

export default <%= className %>
