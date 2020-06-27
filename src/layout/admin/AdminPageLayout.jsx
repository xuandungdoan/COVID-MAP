import React, { Component } from "react";
import AdminSubnav from './AdminSubnav';
import AdminLayout from './AdminLayout';
class AdminPageLayout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props)
      {
        super(props);
    }   
  render() {
      
    return (
      <div>
        <AdminLayout/>
         <AdminSubnav/>
         {this.props.children}
      </div>

    );
  }
}

export default AdminPageLayout;