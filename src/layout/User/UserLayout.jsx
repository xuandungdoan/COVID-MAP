import React, { Component } from 'react';
import Header from "../_shared/Header"

class UserLayout extends Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }   
    render(){
        
        return (
            <React.Fragment>
                <Header isLogin = {this.props.isLogin}/>
                {this.props.children}
                <footer></footer>
            </React.Fragment>
        )
    }
}

export default UserLayout;