import React, { Component } from 'react';
import Header from "../_shared/Header"
import SubNav from "./AdminSubnav"

class AdminLayout extends Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }   
    render(){
        
        return (
            <React.Fragment>
                <Header isLogin = {true}/>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default AdminLayout;