import React, { useState } from 'react'
import './Dashboard.css'

import Sidebar from './Sidebar';
import MiddlePanel from './MiddlePanel';
import NotificationPanel from './Notification';
import Header from '../Header/Header'
import AddUserPage from './User'
import Userlist from './UserList';
import AssignBonds from './AssignBonds';


export default function Dashboard(props) {
  const [page, setPage] = useState("Dashboard");
  
  const changePage = (event) => {
    console.log(event.target.outerText)
    setPage(event.target.outerText)
  }

  return (
    <div className="Dashboard">
      <Header logout={props.logout}/>
      <div class="container-fluid" id="main" style={{height: "100%"}}>
        <div class="row row-offcanvas row-offcanvas-left main-container" style={{height: "100%"}}>
          <Sidebar changePage={changePage} isManager={props.isManager} name={props.name} email={props.email}/>
          {
            (page == "Dashboard") &&
            <MiddlePanel id={props.id} isManager={props.isManager}/>
          }
          {
            ((page == "Create User") && (props.isManager)) &&
            <AddUserPage />
          }
          {
            (page == "User list" && (props.isManager)) &&
            <Userlist />
          }
          {
            (page == "Assign Bonds" && (props.isManager)) &&
            <AssignBonds />
          }
        </div>
      </div> 
    </div>
  )
}
