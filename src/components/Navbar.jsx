import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from "react-router-dom";
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import icon from '../assets/blockchain.png';

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 768) {
            setActiveMenu(false);
        }
        else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    const handleCloseMenu = () => {
        if (screenSize <= 768) {
            setActiveMenu(!activeMenu);
        }
    }

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size={"large"} />
                <Typography.Title level={2} className="logo">
                    <Link to="/">CryptoBytes</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={handleCloseMenu}>
                    <MenuOutlined />
                </Button>
            </div>
            {
                activeMenu
                    ?
                    <Menu theme="dark">
                        <Menu.Item icon={<HomeOutlined />}>
                            <Link to="/" onClick={handleCloseMenu}>Home</Link>
                        </Menu.Item>
                        <Menu.Item icon={<FundOutlined />}>
                            <Link to="/cryptocurrencies" onClick={handleCloseMenu}>Crypto Currencies</Link>
                        </Menu.Item>
                        <Menu.Item icon={<MoneyCollectOutlined />}>
                            <Link to="/exchanges" onClick={handleCloseMenu}>Exchanges</Link>
                        </Menu.Item>
                        <Menu.Item icon={<BulbOutlined />}>
                            <Link to="/news" onClick={handleCloseMenu}>News</Link>
                        </Menu.Item>
                    </Menu>
                    :
                    null
            }
        </div>
    )
}

export default Navbar;