import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

class Filter extends React.Component {

  handleChange = (event) => {
    this.props.updateFilter(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter:
        <input
          value={this.props.filter}
          onChange={this.handleChange} />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    filter: store.filter
  }
}

export default connect(
  mapStateToProps,
  { updateFilter }
)(Filter)