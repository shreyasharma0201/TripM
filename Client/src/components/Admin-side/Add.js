import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, Outlet } from "react-router-dom";
import Navbar from './Navbar';
import Agent from "../images/icons8-agent-96.png"
import Driver from "../images/icons8-driver-96.png"
import Cab from "../images/icons8-cab-96.png"

const Add = () => {
    return (
        <>
            <div className="container-xxl mt-5">
                <div className="row">
                    <div className="col-md-6 col-xl-4">
                        <NavLink to="/admin/add-agent" className="link" >
                            <div className="card mt-1 card-2 card-hover border-0 add" >
                                <div className="card-body d-flex justify-content-around card-text">
                                    <div>
                                        <img src={Agent} alt="user" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">Add Agent</h3>
                                        <h6 className="card-subtitle mb-2">Click here to add agents.</h6>
                                    </div>
                                </div>
                            </div>
                        </NavLink>  
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <NavLink to="/admin/add-driver" className="link" >
                            <div className="card mt-1 card-4 card-hover border-0 add" >
                                <div className="card-body d-flex justify-content-around card-text">
                                    <div>
                                        <img src={Driver} alt="user" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">Add Driver</h3>
                                        <h6 className="card-subtitle mb-2">Click here to add drivers.</h6>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <NavLink to="/admin/add-vehicle" className="link" >
                            <div className="card mt-1 card-3 card-hover border-0 add" >
                                <div className="card-body d-flex justify-content-around card-text">
                                    <div>
                                        <img src={Cab} alt="user" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">Add Vehicles</h3>
                                        <h6 className="card-subtitle mb-2">Click here to add vehicles.</h6>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    )
};

export default Add