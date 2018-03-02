import React from 'react'
import '../index.css'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    if (this.props.notification) {
      return (
        <div className="alert">
          {this.props.notification}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    notification: store.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)