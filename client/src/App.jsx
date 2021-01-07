import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import './App.css';

function App() {
  const [ dates, setDates ] = useState([]);
  const [ bitcoinPrice, setBitcoinPrice ] = useState([]);

  useEffect(() => {
    getData();
    createChart();
  }, [dates]);

  const getData = async () => {
    try {
      const res = await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json');
      setDates(Object.keys(res.data.bpi));
      setBitcoinPrice(Object.values(res.data.bpi));
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
      <canvas id='myChart' width='400' height='400' />
    </div>
  );
};

export default App;