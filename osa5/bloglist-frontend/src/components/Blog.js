import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailVisible: false
    }
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showWhenVisible = { display: this.state.detailVisible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div onClick={e => this.setState({ detailVisible: !this.state.detailVisible })}>
          {this.props.blog.title} - {this.props.blog.author}
          <div style={showWhenVisible}>
            {this.props.blog.url}
            <p>
              {this.props.blog.likes} likes
            <button>like</button>
            </p>
            added by 
          </div>
        </div>
      </div>
    )
  }
}
export default Blog