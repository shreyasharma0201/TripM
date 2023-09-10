import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import Navbar from './Navbar';
import Agent from "../images/icons8-agent-96.png"
import Driver from "../images/icons8-driver-96.png"
import Cab from "../images/icons8-cab-96.png"

const Find = () => {
    return (
        <>
            <div className="container-xxl mt-5">
                <div className="row">
                    <div className="col-md-6 col-xl-4">
                        <NavLink to="/admin/agents" className="link" >
                            <div className="card mt-1 card-8 border-0 card-hover" >
                                <div className="card-body d-flex justify-content-around card-text">
                                    <div>
                                        <img src={Agent} alt="user" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">Agents</h3>
                                        <h6 className="card-subtitle mb-2">Click here to find agents.</h6>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <NavLink to="/admin/drivers" className="link" >
                            <div className="card mt-1 card-10 border-0 card-hover" >
                                <div className="card-body d-flex justify-content-around card-text">
                                    <div>
                                        <img src={Driver} alt="user" />
                                    </div>
                                    <div>
                                        <h3 className="card-title"> Drivers</h3>
                                        <h6 className="card-subtitle mb-2">Click here to find drivers.</h6>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <NavLink to="/admin/vehicles" className="link" >
                            <div className="card mt-1 card-9 border-0 card-hover" >
                                <div className="card-body d-flex justify-content-around card-text">
                                    <div>
                                        <img src={Cab} alt="user" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">Vehicles</h3>
                                        <h6 className="card-subtitle mb-2">Click here to find vehicles.</h6>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Find             