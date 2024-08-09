import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'

const Coin = () => {
  const {currency} = useContext(CoinContext)
  const {coinId} = useParams()
  const [coinDetails, setCoinDetails] = useState()
  const [historicaData, setHistoricaData] = useState()

  const fetchCoinDetails = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-eT7iuHfUUG5yojLg5FJDBoTN'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinDetails(response))
      .catch(err => console.error(err));

 }

 const fetchHistoricaData = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-eT7iuHfUUG5yojLg5FJDBoTN '
    }
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
    .then(response => response.json())
    .then(response => setHistoricaData(response))
    .catch(err => console.error(err));
 }

 useEffect(()=>{
  fetchCoinDetails();
  fetchHistoricaData();
 },[currency]);

  
if(coinDetails && historicaData){
  return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={coinDetails.image.large} alt='' />
        <p><b>{coinDetails.name} ({coinDetails.symbol.toUpperCase()})</b></p>
      </div>
      <div className='coin-chart'>
        <LineChart historicaData={historicaData} />
      </div>
      <div className='coin-info'>
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinDetails.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coinDetails.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol} {coinDetails.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>{currency.symbol} {coinDetails.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>{currency.symbol} {coinDetails.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  )
} else{
  return (
    <div className='spinner'>
      <div className='spin'></div>
    </div>
  )
}
  
}

export default Coin