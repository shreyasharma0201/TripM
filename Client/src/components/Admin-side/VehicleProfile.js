import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import pic from "../images/icons8-cab-96.png";

const Profile = () => {
    const { vehicleID } = useParams();           // use same named variable as passed in router page
    const [Vehicle, setVehicle] = useState({});

    const navigate = useNavigate();

    const callProfilePage = async () => {
        try {
            const res = await fetch(`/admin/vehicles/profile/${vehicleID}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            const getData = new Object(data);
            setVehicle(getData);
            // data need to rendered after loading of page hence use useState.
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/admin/vehicles');
        }

    }

    useEffect(() => {
        callProfilePage();
    }, []);

    return (
        <>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Vehicle's Profile </h2>
                            <br></br>
                        </div>
                        {/* Profile */}
                        <form>
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <img src={pic} alt="user" className="img-res" />
                                </div>
                                <br></br>
                                <div className="col-md-6 p-2">
                                    <h4>Vehicle's Details </h4>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-light">Edit</button>
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
                                                <label htmlFor="">Registration No. </label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p> {Vehicle.regno} </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Color</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p> {Vehicle.color} </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="dob">Vehicle Class</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p>{Vehicle.vclass}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Model</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p> {Vehicle.model} </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Seating Capacity</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p> {Vehicle.cap} </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="address">Fuel Type</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p>{Vehicle.fuel}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="address">Owner's Name</label>
                                            </div>
                                            <div className="col-md-6 driver-field">
                                                <p>{Vehicle.owner}</p>
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
