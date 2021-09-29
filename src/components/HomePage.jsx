import React from 'react';

import millify from 'millify';
import { Typography, Row, Col, Statistic, Card } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const HomePage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return <Loader />;

    return (
        <>
            <Title level={2} className="heading">
                Global Crypto Statistics
            </Title>
            <Row gutter={[12, 12]}>
                <Col span={12}><Card style={{ height: 125, borderRadius: '10px' }}><Statistic title="Total Crypto Currencies" value={globalStats.total} /></Card></Col>
                <Col span={12}><Card style={{ height: 125, borderRadius: '10px' }}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Card></Col>
                <Col span={12}><Card style={{ height: 125, borderRadius: '10px' }}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Card></Col>
                <Col span={12}><Card style={{ height: 125, borderRadius: '10px' }}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Card></Col>
                <Col span={12}><Card style={{ height: 125, borderRadius: '10px' }}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Card></Col>

            </Row>
            <div className="home-heading-container">
                <Title level={3}>Top 10 Cryptos</Title>
                <Title level={5} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={3}>Latest Crypto News</Title>
                <Title level={5} className="show-more"><Link to="/news">Show more</Link></Title>
            </div>
            <News simplified />
        </>
    )
}

export default HomePage;