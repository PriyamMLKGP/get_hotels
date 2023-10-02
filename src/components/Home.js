import React from 'react'
import { useEffect, useState } from 'react';
import { setHotels } from '../actions';
import hotelData from '../data/hotels.json';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import HotelCard from './HotelCard';
import { Row, Col, Tabs, Button } from 'antd';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHotels(hotelData));
  }, []);
  const hotels = useSelector(state => state.hotels);
  const [activeTab, setActiveTab] = useState('NewYork'); // Default active tab
  const [visibleCards, setVisibleCards] = useState(6);

  const handleShowMore = () => {
    setVisibleCards(prevCount => prevCount + 6);
  };

  return (
    <div>
    <Navbar />

    <Tabs 
      style={{paddingTop: "50px"}}
      defaultActiveKey={activeTab}
      type="card" 
      size="small"
      activeKey={activeTab}
      onChange={key => {
        setActiveTab(key);
        setVisibleCards(6);  // Reset the visible cards count when changing tabs
      }}
      items={Object.keys(hotels).map(city => ({
        key: city,
        tab: city,
        label: city,
      }))}
    />

    {Object.keys(hotels).map(city => {
      if (city === activeTab) {
        return (
          <div key={city}>
            <Row 
              gutter={[16, 16]} 
              style={{ paddingLeft: "10%", paddingRight: "10%" }}
            >
              {hotels[city].slice(0, visibleCards).map(hotel => (
                <Col span={8} key={hotel.id}>
                  <HotelCard hotel={hotel} />
                </Col>
              ))}
            </Row>

            {hotels[city].length > visibleCards && (
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Button onClick={handleShowMore}>Show More</Button>
              </div>
            )}
          </div>
        );
      }
      return null;
    })}

  </div>
  
  )
}
