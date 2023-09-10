import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import search from '../images/search.png';

function Drivers() {
  const navigate = useNavigate();
  const [Drivers, setDrivers] = useState([{}]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const callDriversPage = async () => {
    try {
      const res = await fetch('/admin/drivers', {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      const getData = new Object(data);
      setDrivers(getData);
      // data need to rendered after loading of page hence use useState.
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/admin/dashboard');
    }

  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = Drivers.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(Drivers)
    }
  }

  useEffect(() => {
    callDriversPage();
  }, []);
  return (
    <>
      <h1 className="mt-1 text-center main-heading">Drivers</h1>
      <hr />
      <div className="menu-tabs container mt-0">
        <div className=" menu-tab d-flex justify-content-center">
          <div>
            <img src={search} alt="s" />
          </div>
          <input
            required
            type="text"
            className="filter p-2"
            onChange={(e) => searchItems(e.target.value)}
            placeholder="Search by phone, name or email">
          </input>
        </div>
      </div>

      <div className="container-xxl mx-auto">
        <div className="col-md-8 mx-auto">
          {
            searchInput.length >= 1 ?
              (filteredResults.map((item, index) => {
                return (
                  <div className="row my-4 driver-box mx-auto" key={index}>
                    <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4">
                      <div className="driver-contents">
                        <NavLink className="link" to={`profile/${item._id}`}> {item.name}</NavLink>
                      </div>
                    </div>
                    <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4">
                      <div className="driver-contents">
                        <span className="driver-field">DL No.</span> {item.DLNo}
                      </div>
                    </div>
                    <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4">
                      <div className="driver-contents">
                        <span className="driver-field">Phone</span> {item.phone}
                      </div>
                    </div>
                  </div>
                )
              }
              )) :
              Drivers.map((item, index) => (
                <div className="row my-4 mx-auto driver-box" key={index}>
                  <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="driver-contents">
                      <NavLink className="link" to={`profile/${item._id}`}> {item.name}</NavLink>
                    </div>
                  </div>
                  <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="driver-contents">
                      <span className="driver-field">DL No.:</span> {item.DLNo}
                    </div>
                  </div>
                  <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="driver-contents">
                      <span className="driver-field">Phone:</span> {item.phone}
                    </div>
                  </div>
                </div>
              ))
          }
        </div> 
        <div className={Drivers.length == 0 ? "no-entry text-center" : "entry"}>No driver found.</div>

      </div>
    </>
  )
}

export default Drivers