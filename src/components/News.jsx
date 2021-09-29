import React from 'react';

import { Typography, Row, Col, Avatar, Card, Select } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80"

const News = (props) => {
    const [newsCategory, setNewsCategory] = React.useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: props.simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);

    console.log(cryptoNews);

    if (!cryptoNews?.value) {
        return <Loader />;
    }

    return (
        <Row gutter={[12, 12]}>
            {
                !props.simplified
                    ?
                    <Col span={24} >
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="select a crypto"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurrency">Cryptocurrency</Option>
                            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                        </Select>
                    </Col>
                    :
                    null
            }
            {
                cryptoNews.value.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title level={4}>{news.name}</Title>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px', borderRadius: '10px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                </div>
                                <p>{news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

export default News;