import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import pic from "../images/icon-nav.png";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCab, faDashboard, faMoneyBill1, faNavicon, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const navigate = useNavigate();
    const [driverData, setdriverData] = useState();
    // name undefined => provide state with empty value.

    const callDriverPage = async () => {
        try {
            const res = await fetch('/driver', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            setdriverData(data.driver);
            // data need to rendered after loading of page hence use useState.
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/driver-login');
        }

    }

    useEffect(() => {
        callDriverPage();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top px-3">
                <NavLink className="navbar-brand animate-charcter" to="/">
                    <img src={pic} alt="icon" />
                    <span className='nav-head'> TripM</span>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <FontAwesomeIcon icon={faNavicon} />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto px-3">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/driver">
                                <FontAwesomeIcon icon={faDashboard} /> Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/driver/customer">
                                <FontAwesomeIcon icon={faAdd} /> New Trip
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/driver/trips">
                                <FontAwesomeIcon icon={faCab} /> Trips
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/driver/expense">
                                <FontAwesomeIcon icon={faMoneyBill1} /> Expense
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon={faUserCircle} size="lg" />
                            </NavLink>
                            <div className="dropdown-menu dropdown-menu-right mt-3" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">{driverData}</a>
                                <NavLink className="nav-link dropdown-item" to="/driver/driver-logout">
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
