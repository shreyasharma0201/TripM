import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import pic from "../images/icons8-driver-96.png";

const Profile = () => {
  const { driverID } = useParams();           // use same named variable as passed in router page
  const [Driver, setDriver] = useState({});

  const navigate = useNavigate();

  const callDriverPage = async () => {
    try {
      const res = await fetch(`/admin/profile/${driverID}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      const getData = new Object(data);
      setDriver(getData);
      // data need to rendered after loading of page hence use useState.
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/admin/drivers');
    }

  }

  useEffect(() => {
    callDriverPage();
  }, []);

  function removeTime(date) {
    if (typeof date === 'string') {
      date = date.split('T')[0];
      return date;
    }
  }

  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title"> Profile </h2>
              <br></br>
            </div>
            {/* Profile */}
            <form>
              <div className="row">
                <div className="col-md-4 text-center">
                  <img src={pic} alt="user" />
                </div>
                <br></br>
                <div className="col-md-6">
                  <div className="profile-head">
                    <h4>Driver's Details </h4>
                  </div>
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-light">Edit</button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <br></br>
                </div>
                <div className="col-md-8 pl-4 user-info">
                  <div className="tab-content profile-tab" id="myTabcontent">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="">Name</label>
                      </div>
                      <div className="col-md-6 driver-field">
                        <p> {Driver.name} </p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Email</label>
                      </div>
                      <div className="col-md-6 driver-field">
                        <p> {Driver.email} </p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dob">Date of Birth</label>
                      </div>
                      <div className="col-md-6 driver-field">
                        <p>{removeTime(Driver.dob)}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Phone</label>
                      </div>
                      <div className="col-md-6 driver-field">
                        <p> {Driver.phone} </p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">City</label>
                      </div>
                      <div className="col-md-6 driver-field">
                        <p> {Driver.city} </p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="address">Address</label>
                      </div>
                      <div className="col-md-6 driver-field">
                        <p>{Driver.address}</p>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                </div>
              </div>
            </form>
            {/* Driving licence */}
            <form>
              <div className="signup-form">
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-6">
                    <div className="profile-head">
                      <h4>Driving Licence</h4>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-light">Edit</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <br></br>
                  </div>
                  <div className="col-md-8 pl-4 user-info">
                    <div className="tab-content profile-tab" id="myTabcontent">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="">Driving Licence No.</label>
                        </div>
                        <div className="col-md-6 driver-field">
                          <p> {Driver.dl} </p>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="issueDate">Issue Date</label>
                        </div>
                        <div className="col-md-6 driver-field">
                          <p>{removeTime(Driver.iD)}</p>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="validUpto">Valid Upto</label>
                        </div>
                        <div className="col-md-6 driver-field">
                          <p>{removeTime(Driver.valid)}</p>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="OLAuthority">DL Authority</label>
                        </div>
                        <div className="col-md-6 driver-field">
                          <p>{Driver.ol}</p>
                        </div>
                        <hr></hr>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {/* Vehicle Class */}
            <form>
              <div className="signup-form">
                <div className="row">
                  <div className="col-md-4">
                  </div>
                  <div className="col-md-6">
                    <div className="profile-head">
                      <h4>Driving Vehicle Class</h4>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-light">Edit</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <br></br>
                  </div>
                  <div className="col-md-8 pl-4 user-info">
                    <div className="tab-content profile-tab" id="myTabcontent">
                      {Driver.vc?.map((VC, index) => (
                        <div className="row" key={index}>
                          <div className="col-md-6" >
                            <label htmlFor="vehicleClass">Vehicle Class</label>
                          </div>
                          <div className="col-md-6 driver-field">
                            <p>{VC.vehicleClass}</p>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="issueDate">Issue Date</label>
                          </div>
                          <div className="col-md-6 driver-field">
                            <p>{removeTime(VC.issueDate)}</p>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="expiryDate">Expiry Date</label>
                          </div>
                          <div className="col-md-6 driver-field">
                            <p>{removeTime(VC.expiryDate)}</p>
                          </div>
                          <p></p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
