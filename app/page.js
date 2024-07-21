'use client'
import Head from 'next/head'
import {useState}  from 'react'
export default function Home() {
const ApiKey=process.env.API_KEY
const [city_name,setcity_name]=useState('')
const [data,setdata]=useState({})
//console.log(city_name)

async function handlesubmit(){
  if(city_name==""){
    alert("Enter the City Name")
  }
  else{
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.APIKEY}`);
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setdata(data);
      console.log(data);
      const element = document.getElementById('wdata');
      element.style.padding = '20px'; 
    } 
    catch (error) {
        alert('Enter Valid city Name');
    }
  }
  
};
const getBackgroundStyle = () => {
  if (!data.weather) return {};
  console.log(data.weather[0].main)
  switch (data.weather[0].main) {
    case 'Clear':
      return { 
        backgroundImage: "url('clearsky.jpg')", 
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
       };
    case 'Clouds':
      return { backgroundColor: 'gray' };
    case 'Rain':
      return { 
        backgroundImage: "url('rainy.jpg')",
        height: "100%", // Changed to vh to cover the entire viewport height
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "white"
      };
    case 'Snow':
      return { backgroundColor: 'white' };
    case 'Thunderstorm':
      return { backgroundColor: 'darkgray' };
    default:
      return { 
        backgroundImage: "url('clearsky.jpg')", 
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
       };
  }
};

  return (
    <>
      <div class="report ">
        <h1 className='text-white text-center font-bold pt-12 text-4xl p-2'>Weather Report For Your City</h1>
      <div className='mt-20 sm:mt-24 text-center flex-column'>
            <input className='ml-8 sm:ml-20 h-14 rounded-full w-80 placeholder-shown:pl-5 text-gray-900 pl-6' type='text' placeholder='Enter The City Name' value={city_name} required onChange={(event)=>setcity_name(event.target.value)}></input>
            <div className='mt-9'>
            <button className='sm:mt-0 sm:ml-12 p-3 bg-violet-800 text-white font-mono rounded-2xl' type='submit' onClick={handlesubmit}>Submit</button>
            </div>
      </div>     
      <div style={getBackgroundStyle()} className='mt-14 pb-80 sm:mt-8 sm:pb-72 pt-0 text-center text-sky-50' id='wdata'>
        <div className="font-extrabold text-3xl">{data.name}</div>
            <div className='font-bold mt-2'>{data.coord?<span>Longitude: {data.coord.lon}   Latitude: {data.coord.lat}</span>:null}</div>
            <div id='temp' className="font-extrabold text-4xl mt-4">{data.main? <h1>{data.main.temp} K</h1>: null}</div>
            <div className="font-bold mt-4 text-3xl">{data.weather? <span>{data.weather[0].main}</span>: null} </div>
            <div className="font-bold mt-3 ">{data.main? <span>Feels like- {data.main.feels_like} K</span>: null} </div>
            <div className="font-bold mt-3">{data.main? <span>Humidity- {data.main.humidity} </span>: null}</div>
            <div className="font-bold mt-3">{data.wind? <span>Wind speed-{data.wind.speed} KMh</span>: null}</div>
            <div className='font-bold mt-4'>{data.main? <span>Pressure-{data.main.pressure} atm</span>:null}</div>
      </div>             
      </div>
    </>
  )
}
