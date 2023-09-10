import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import pic from "../images/road-trip2.png";

const Profile = () => {
    const { tripID } = useParams();           // use same named variable as passed in router page
    const [Trip, setTrip] = useState({});
    const [Vehicle, setVehicle] = useState({});
    const [Agent, setAgent] = useState({});
    const [Customer, setCustomer] = useState({});
    const navigate = useNavigate();

    const callProfilePage = async () => {
        try {
            const res = await fetch(`/driver/trips/${tripID}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            const getData = new Object(data);
            setTrip(getData.trip);
            if(getData.trip.agent){
                setAgent(getData.trip.agent);
            }
            if (getData.trip.cid) {
                setCustomer(getData.trip.cid);
            }
            setVehicle(getData.vehicle);
            // data need to rendered after loading of page hence use useState.
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/driver/trips');
        }

    }

    useEffect(() => {
        callProfilePage();
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
                            <h2 className="form-title"> Trip Profile</h2>
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
                                        <h4>Trip's Details </h4>
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
                                                <label htmlFor="">From</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p> {Trip.fromPlace} </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">To</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p> {Trip.toPlace} </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="dob">Trip Date</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p>{removeTime(Trip.tripDate)}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="dob">Booking Date</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p>{removeTime(Trip.bookingDate)}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Trip type</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p> {Trip.tripType} </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Total Distance (in KM)</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p> {Trip.totalKM} </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="address">Gross Income</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p>{Trip.GrossIncome}</p>
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
                                            <h4>Agent's Details</h4>
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
                                                    <p> {Agent.name} </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="issueDate">Email ID</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Agent.email}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="validUpto">Phone</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Agent.phone}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="OLAuthority">Commission</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Trip.Commission}</p>
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
                                            <h4>Vehicle's Details</h4>
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
                                                    <label htmlFor="">Registration No.</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p> {Vehicle.regno} </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="issueDate">Color</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Vehicle.color}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="validUpto">Model</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Vehicle.model}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="OLAuthority">Vehicle Class</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Vehicle.vclass}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="OLAuthority">Fuel Type</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Vehicle.fuel}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="OLAuthority">Capacity</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Vehicle.cap}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="OLAuthority">Owner's Name</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Vehicle.owner}</p>
                                                </div>
                                                <hr></hr>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </form>
                        <form>
                            <div className="signup-form">
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-6">
                                        <div className="profile-head">
                                            <h4>Customer's Details</h4>
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
                                                    <p> {Customer.name} </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="issueDate">Phone</label>
                                                </div>
                                                <div className="col-md-6 driver-field">
                                                    <p>{Customer.phone}</p>
                                                </div>
                                                
                                            </div>
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
