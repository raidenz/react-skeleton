import React from 'react'
import {roleMenus} from 'utils/auth'
import {Link} from 'react-router-dom'

export const SideMenuItem = (props) => {
  return (
    <li><Link to={props.menu.link}>{props.menu.name}</Link></li>
  )
}

const SideMenu = (props) => {
  return (
    <ul>
      {
        roleMenus().map((menu, i) => (
          <SideMenuItem key={i} menu={menu} />
        ))
      }
    </ul>
  )
}

export default SideMenu
