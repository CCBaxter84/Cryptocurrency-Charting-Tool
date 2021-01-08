import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [ dates, setDates ] = useState([]);
  const [ bitcoinPrice, setBitcoinPrice ] = useState([]);

  useEffect(() => {
    getData();
    createChart();
  }, [dates, bitcoinPrice]);

  const getData = async () => {
    try {
      const res = await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json');
      const currentDates = JSON.stringify(dates);
      const newDates = JSON.stringify(Object.keys(res.data.bpi));
      if (currentDates !== newDates) {
        setDates(Object.keys(res.data.bpi));
      }
      const currentPrice = JSON.stringify(bitcoinPrice);
      const newPrice = JSON.stringify(Object.values(res.data.bpi));
      if (currentPrice !== newPrice) {
        setBitcoinPrice(Object.values(res.data.bpi));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createChart = () => {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Bitcoint Price Index',
            data: bitcoinPrice,
            backgroundColor: 'lightblue',
            borderColor: 'blue'
          }
        ]
      },
      options: {
        responsiveness: true
      }
    });
  };

  return (
    <div className='App'>
      <Header />
      <canvas id='myChart' width='400' height='400' />
      <Footer />
    </div>
  );
};

export default App;