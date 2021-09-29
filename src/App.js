import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';

import { Layout, Typography, Space } from 'antd';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Exchanges from './components/Exchanges';
import Cryptodetails from './components/Cryptodetails';
import News from './components/News';
import Cryptocurrencies from './components/Cryptocurrencies';

const App = () => {
	return (
		<div className="app">
			{/* Navbar */}
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<Layout>
					<div className="routes">
						<Switch>
							<Route exact path="/">
								<HomePage />
							</Route>
							<Route exact path="/exchanges">
								<Exchanges />
							</Route>
							<Route exact path="/cryptocurrencies">
								<Cryptocurrencies />
							</Route>
							<Route exact path="/crypto/:coinId">
								<Cryptodetails />
							</Route>
							<Route exact path="/news">
								<News />
							</Route>
						</Switch>
					</div>
				</Layout>
				<div className="footer">
					<Typography.Title level={5} style={{ color: '#fff', textAlign: 'center' }}>
						CryptoBytes <br />
						All rights reserved
					</Typography.Title>
					{/* <Space>
						<Link to="/">Home</Link>
						<Link to="/">Crypto Currencies</Link>
						<Link to="/">Exchange</Link>
						<Link to="/">News</Link>
					</Space> */}
				</div>
			</div>
		</div>
	);
}

export default App;
