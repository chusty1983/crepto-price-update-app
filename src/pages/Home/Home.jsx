import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

const Home = () => {
    const {allCoin, currency} = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    
    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
        if(event.target.value === ""){
            setDisplayCoin(allCoin)
        }
    }

    const handleForm = async (event) => {
        event.preventDefault();

        const coins = await allCoin.filter((item)=>{
            return item.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
        })
        setDisplayCoin(coins)
        
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      const nextPage = () => {
        if (currentPage < Math.ceil(displayCoin.length / itemsPerPage)) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      };
    
      const prevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        }
      };

      const displayeNewCoin =  displayCoin.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      const totalPages = Math.ceil(displayCoin.length / itemsPerPage);
      


    useEffect(()=>{
        setDisplayCoin(allCoin);
    },[allCoin])
  return (
    <div className='home'>
        <div className='hero'>
            <h1>Largest <br /> Crepto Marketplace</h1>
            <p>Welcome to the world's Creptocurrency Marketplace
                Sign up to explore more about Creptos
            </p>
            <form onSubmit={handleForm}>
                <input type='text' value={searchInput} onChange={handleSearchInput} list='coinlist' placeholder='Search Crepto...' required />
                <datalist id='coinlist'>
                    {
                        allCoin.map((item, index)=>(
                            <option key={index} name={item.name} />
                        ))
                    }
                </datalist>
                <button type='submit'>Search</button>
            </form>
        </div>
        <div className='crepto-table'>
            <div className='table-layout'>
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:"center"}}>24H Change</p>
                <p className='market-cap myspace'>Market Cap</p>
            </div>
            {
                displayeNewCoin.map((item, index) => (
                    <Link to={`/coin/${item.id}`} key={index} className='table-layout'>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt='' />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                          {Math.floor(item.price_change_percentage_24h*100)/100}
                        </p>
                        <p className='market-cap myspace'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))
            }
        </div>
        <div className='page'>
        <button onClick={prevPage} disabled={currentPage === 1} className='prev'>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => paginate(index + 1)} 
            className={currentPage === index + 1 ? 'active' : 'inactive'}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages} className='next'>Next</button>
        </div>
    </div>
  )
}

export default Home