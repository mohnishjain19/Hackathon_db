import React from 'react'
import './Dashboard.css'

const Sidebar = (props) => {
    return (
         <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0 sidebar-container" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>{props.name}</h5></a></li>
                <li className="nav-item mb-2 "><a class="nav-link text-secondary" href="#"><i class="fas fa-user font-weight-bold"></i> <span className="ml-3">{props.email}</span></a></li>
                <li className="nav-item mb-2"  ><a class="nav-link text-secondary" href="#" id="Dashboard" onClick={props.changePage}><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3">Dashboard</span></a></li>
                {props.isManager && <li className="nav-item mb-2" id="CreateUser"><a class="nav-link text-secondary" id="CreateUser" href="#" onClick={props.changePage}><i class="fas fa-file-export font-weight-bold"></i><span className="ml-3">Create User</span></a></li>}
                {props.isManager && <li className="nav-item mb-2" id="UserList"><a class="nav-link text-secondary" href="#" id="UserList" onClick={props.changePage}><i class="fas fa-tablet-alt font-weight-bold"></i><span className="ml-3">User list</span></a></li>}
                
            </ul>
       </div>
    )
}
 
export default Sidebar