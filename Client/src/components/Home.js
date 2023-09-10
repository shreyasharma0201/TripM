import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import Driver from "./images/icons8-driver-96.png"
import admin from "./images/admin.png"
import weather from "./images/cloudy.png"
import pic from './images/icon-head.png';

const Home = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    
    const allok = true;
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=13f693b7ce861da8472821005a4288da`);
    const result = await res.json();
    if (!res.status === 200) {
      allok = false;
      window.location.reload();
    }
    else {
      const getData = new Object(result);
      setData(getData);
    }

  }
  useEffect(() => {
    
    fetchData();
  }, [lat, long]);
  return (
    <>
      <div className='mt-4 col-xl-12 d-flex justify-content-center align-items-center'>
        <div className=''>
          <img src={pic} alt="icon" className='img-home' />
        </div>
        
        <div className=''>  
          <div className='main-heading home-head'> TripM - Trip Management System</div>
        </div>
      </div>
      <hr></hr>
      <div className="container-xxl my-5" >
        <div className="row">
          <div className="col-md-5 col-xl-5 col-lg-5">
            <NavLink to="/admin" className="link" >
              <div className="card mt-1 card-1 card-hover border-0 add" >
                <div className="card-body d-flex justify-content-around card-text">
                  <div>
                    <img src={admin} alt="user" />
                  </div>
                  <div>
                    <h3 className="card-title">Admin Login</h3>
                    <h6 className="card-subtitle my-2">For Admins Only.</h6>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col-md-2 col-xl-2 col-lg-2"></div>
          <div className="col-md-5 col-xl-5 col-lg-5">
            <NavLink to="/driver" className="link" >
              <div className="card mt-1 card-7 card-hover border-0 add" >
                <div className="card-body d-flex justify-content-around card-text">
                  <div>
                    <img src={Driver} alt="user" />
                  </div>
                  <div>
                    <h3 className="card-title">Driver Login</h3>
                    <h6 className="card-subtitle my-2">For drivers only.</h6>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3 col-xl-3 col-lg-3"></div>
          <div className="col-md-6 col-xl-6 col-lg-6">
            <div className="card card-0 mt-1 border-0" >
              <div className="card-body d-flex justify-content-around card-text">
                <div>
                  <img src={weather} alt="user" className='img-res' />
                </div>
                {(typeof data.main != 'undefined') ? (
                  <div>
                    <h3 className="card-title">{data.name}</h3>
                    <p className="card-subtitle my-2">Temperature: {data.main.temp} &deg;C</p>
                    <p className="card-subtitle my-2">Humidity: {data.main.humidity}%</p>
                    <p className="card-subtitle my-2">Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                    <p className="card-subtitle my-2">Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                    <p className="card-subtitle my-2">Description: {data.weather[0].main}</p>
                  </div>
                ) : (
                  <div>
                    <h2 className='text-center'>Loading....</h2>
                    
                      <div className="spinner-border text-info" role="status" style={{ width: '5rem', height: '5rem' }}>
                        
                      </div>
                  </div>
                )}  
              </div>
            </div>
          </div>  
          <div className="col-md-3 col-xl-3 col-lg-3"></div>
        </div>
      </div>
    </>
  )
};

export default Home