import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Details() {
  const {countryUrl} = useParams();
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  function formatString(inputString) {
    return inputString.toLowerCase().split(' ').join('-');
  }
  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    console.log(countryUrl)
    const countriesInfoLoader = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all')
      const info = await response.json()
      setAllData(info)
      setData(info.filter(country => formatString(country['name']['common']) === countryUrl))
    }
    
    if (countryUrl) {
      countriesInfoLoader();
    }
  }, [countryUrl])

  return (
    <div className='w-full min-h-[100vh] h-full bg-lightBg dark:bg-darkBg px-5 pt-24 md:px-14 pb-5 dark:text-white'>
       <div className="flex justify-start mb-10">
      <Link to='/countries-gallery/'>
        <button className='flex bg-white dark:bg-darkElem px-4 py-2 justify-center lg:gap-2 items-center rounded-lg shadow-md text-lg lg:w-[125px]'>
          <FaArrowLeft className='mr-2 min-h-[16px] min-w-[16px]' />
          <span className='font-semibold'>Back</span>
        </button>
      </Link>
    </div>
      {data.length > 0 ? 
      <div className='xl:flex xl:gap-40'>
      <div>
      <img src={data[0]['flags']['png']} alt={data[0]['flags']['alt']} className='m-auto h-[250px] w-[350px] xl:h-[400px] xl:w-[500px] xl:mt-10 mb-6' /> 
      </div>
      <div className='xl:mt-20'>
      <h3 className='font-extrabold text-2xl ml-8 mb-4 xl:text-4xl'>{data[0]['name']['common']}</h3>
      <div className='xl:flex xl:gap-60 xl:text-xl xl:mt-10'>
      <div className='ml-8'>
        <p className='mb-2'><span className='font-semibold'>Native Name: </span>{data[0]['name']['official']}</p>
        <p className='mb-2'><span className='font-semibold'>Population: </span>{addCommasToNumber(data[0]['population'])}</p>
        <p className='mb-2'><span className='font-semibold'>Region: </span>{data[0]['region']}</p>
        <p className='mb-2'><span className='font-semibold'>Subregion: </span>{data[0]['subregion']}</p>
        <p className='mb-2'><span className='font-semibold'>Capital: </span>{data[0]['capital']}</p>
      </div>
      <div className='ml-8 mt-8'>
        <p className='mb-2'><span className='font-semibold'>Top level Domain: </span>{data[0]['tld'][0]}</p>
        <p className='mb-2'><span className='font-semibold'>Currencies: </span>{Object.values(data[0]['currencies'])[0]['name']}</p>
        <p className='mb-2'><span className='font-semibold'>Languages: </span>{Object.values(data[0]['languages']).map((language, index, array) => index === array.length - 1 ? language : language + ', ')}</p>
      </div>
      </div>
      <div className='ml-8 mt-5'>
        <h4 className='text-xl font-semibold xl:text-2xl mb-4'>Border Countries: </h4>
        <div className='grid grid-cols-3 gap-5'>
        {data[0]['borders'] && data[0]['borders'].length > 0 ? data[0]['borders'].map(border => (
          border !== 'ISR' ?
          <div className='mt-3 bg-white rounded-md shadow-lg min-w-[75px] text-center h-[25px] dark:bg-darkElem'>{border}</div> : '')) 
          : <div className='mt-3 bg-white rounded-md cursor-default shadow-lg min-w-[75px]  text-center h-[25px] dark:bg-darkElem'>No Borders</div>} 
        </div>
      </div>
      </div>
      </div>
      : ''}
    </div>
  )
}

export default Details