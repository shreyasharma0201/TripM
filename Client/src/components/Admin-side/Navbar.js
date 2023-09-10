import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import pic from "../images/icon-nav.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faDashboard, faSearch, faNavicon, faSignOutAlt, faUserAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const navigate = useNavigate();
    const [adminData, setadminData] = useState({});
    // name undefined => provide state with empty value.

    const callAdminPage = async () => {
        try {
            const res = await fetch('/admin', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            setadminData(data);
            // data need to rendered after loading of page hence use useState.
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/admin-login');
        }

    }

    useEffect(() => {
        callAdminPage();
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
                            <NavLink className="nav-link" to="/admin">
                                <FontAwesomeIcon icon={faDashboard} /> Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/admin/add">
                                <FontAwesomeIcon icon={faAdd} /> Add
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/find">
                                <FontAwesomeIcon icon={faSearch} /> Find
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon={faUserCircle} size="lg" />
                            </NavLink>
                            <div className="dropdown-menu dropdown-menu-right mt-3" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">{adminData.admin}</a>
                                <NavLink className="nav-link dropdown-item" to="/admin/logout">
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
