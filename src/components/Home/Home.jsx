import React, { useEffect } from 'react'
import Card from '../Card/Card'
import { Link, useLoaderData } from 'react-router-dom'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import SearchResult from '../SearchResult/SearchResult';

function Home() {
  const [data, setData] = useState([])
  const [region, setRegion] = useState('default')
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const countriesInfoLoader = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region')
      const info = await response.json()
      setData(info);
    }
    countriesInfoLoader();
  }, [])

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function formatString(inputString) {
    return inputString.toLowerCase().split(' ').join('-');
  }

  const handleSearchChange = (searchValue) => {
    setSearchInput(searchValue)
    setSearchResults(data.filter(country => country['name']['common'].toLowerCase().includes(searchValue) && country['name']['common'] !== 'Israel'))
  }

  return (
    <div className='w-full min-h-[100vh] h-full bg-lightBg dark:bg-darkBg px-5 pt-24 md:px-14'>
      <div className='flex flex-col w-full lg:flex-row lg:justify-between mb-2'>
      <div className='bg-white p-3 dark:bg-darkElem lg:w-[30%] rounded-lg flex items-center mb-2'>
        <FaSearch className='inline text-darkElem dark:text-white mr-2 w-[16px] h-[16px]' />
        <label htmlFor="country" className='cursor-text flex-grow'>
          <input type="text" id='country' name='country' placeholder='Search for a country...' className='outline-none dark:bg-darkElem dark:text-white text-lg' value={searchInput} onChange={e => handleSearchChange(e.target.value)} />
        </label>
      </div>
      <div className='flex flex-col overflow-y-scroll overflow-x-hidden bg-white dark:bg-darkElem min-w-[200px] max-h-[200px] lg:hidden dark:text-white rounded-md relative'>
      {searchInput ? searchResults.map(country => (
        <Link to={'details/' + formatString(country['name']['common'])} key={country['name']['common']}>
        <SearchResult 
        img={country['flags']['png']}
        alt={country['flags']['alt']}
        name={country['name']['common']} />
        </Link>
      )) : ''}
      </div>
        <select className='w-[50%] min-w-[150px] mt-5 cursor-pointer lg:mt-0 md:w-[35%] lg:w-[10%] bg-white p-3 dark:bg-darkElem dark:text-white rounded-lg' value={region} onChange={(e) => setRegion(e.target.value)} >
          <option value="default" disabled className='hidden'>Filter By Region</option>
          <option value="africa" >Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className='hidden lg:flex lg:flex-col overflow-y-scroll overflow-x-hidden bg-white dark:bg-darkElem w-[30%] max-h-[200px] dark:text-white rounded-md '>
      {searchInput ? searchResults.map(country => (
         <Link to={'details/' + formatString(country['name']['common'])} key={country['name']['common']}>
        <SearchResult 
        img={country['flags']['png']}
        alt={country['flags']['alt']}
        name={country['name']['common']} />
        </Link>
      )) : ''}
      </div>
      <div className='flex flex-col items-center md:grid md:gap-10 md:grid-cols-2 md:place-items-center lg:grid-cols-3 2xl:grid-cols-4'>
      {data
        .filter(country => region !== 'default' ? region === country.region.toLowerCase() : region === 'default' && country['name']['common'] !== 'Israel')
        .map(country => (
          <div key={country['name']['common']}>
            <Link to={'details/' + formatString(country['name']['common'])}>
              <Card
                img={country['flags']['png']}
                alt={country['flags']['alt']}
                name={country['name']['common']}
                population={addCommasToNumber(country['population'])}
                region={country['region']}
                capital={country['capital']}
              />
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Home