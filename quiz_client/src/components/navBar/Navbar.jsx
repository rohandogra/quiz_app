import { Menu } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
// import { Menu } from 'antd';

function Navbar() {
    let location = window.location.pathname.split("/")[1];

    console.log(location)
    const handleClick = () => {

    }
    return (
        <Menu theme="dark" onClick={handleClick} defaultSelectedKeys={location} mode="horizontal">
            <Menu.Item key="" >
                <Link to='/home'>Home</Link>
            </Menu.Item>
            <Menu.Item key="create" >
                <Link to='/create'>Create Quiz</Link>
            </Menu.Item>
        </Menu>
    )
}

export default Navbar
