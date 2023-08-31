import React from 'react'

class Image extends React.Component{
    render(){
        return(
            <img className="logotype" src={this.props.image} />
        )
    }
}

export default Image