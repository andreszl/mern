import React, { Component } from 'react'
import HomeContent from '../containers/HomeContent'

class Home extends Component {
    render(){
        return ( 
            <div>
                <h1>Home Component </h1>   
                <HomeContent /> 
            </div>          
        )
    }
}

export default Home