import React from 'react'
import logout from "./logout-icon.png"
import './Header.css'

export default function Header() {
  return (
    <div className='header' style={{ "position": "relative", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "height": "60px"}}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
        <div style={{paddingLeft: "20px", "display": "flex", "justifyContent": "space-around", "width": "250px", "alignItems": "center"}} >
            <img src="https://logos-marques.com/wp-content/uploads/2021/07/Deutsche-Bank-Logo.png" height={40}/>
            <p style={{"font-family": "Playfair Display", "font-size": "1.3rem"}}>Deutsche Bank</p>
        </div>
        <img src={logout} height={24} style={{"paddingRight": 30}}/>
    </div>
  )
}
