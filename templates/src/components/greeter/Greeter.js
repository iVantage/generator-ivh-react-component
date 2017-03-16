
import React from 'react'

import './<%= className %>.css'

const propTypes = {
  moniker: React.PropTypes.string
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
