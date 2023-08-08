import React from 'react'
import './Dashboard.css'
import Userlist from './userlist';

import Sidebar from './Sidebar';
import MiddlePanel from './MiddlePanel';
import NotificationPanel from './Notification';
import Header from '../Header/Header'


export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Header />
      <div class="container-fluid" id="main">
        <div class="row row-offcanvas row-offcanvas-left main-container">
          <Sidebar/>
          {/* <MiddlePanel/> */}
          <Userlist/>
          <NotificationPanel/>
        </div>
      </div> 
    </div>
  )
}
