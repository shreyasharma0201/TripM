import React, { useState, useEffect } from "react";
import search from '../images/search.png';
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Agents() {
    const navigate = useNavigate();
    const [Agents, setAgents] = useState([{}]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    // name undefined => provide state with empty value.

    const callAgentsPage = async () => {
        try {
            const res = await fetch('/admin/agents', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            const getData = new Object(data);
            setAgents(getData);
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
            const filteredData = Agents.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(Agents)
        }
    }

    const AgentDelete = (deleteid) => {
        console.log("Deleted");
    }
    useEffect(() => {
        callAgentsPage();
    }, []);
    return (
        <>

            <h1 className="mt-1 text-center main-heading">Agents</h1>
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

            <div className="menu-items container-xxl mx-auto m-2">
                <div className="col-md-8 mx-auto">
                    {
                        searchInput.length >= 1 ? 
                        (filteredResults.map((item, index) => {
                            return(
                                <div className="row my-4 mx-auto driver-box" key={index}>
                                    <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4">
                                        <div className="driver-contents">
                                            <span className="driver-field">Name</span> {item.name}
                                        </div>
                                    </div>
                                    <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4">
                                        <div className="driver-contents">
                                            <span className="driver-field">Email</span> {item.email}
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
                        )):
                        Agents.map((item, index) => (
                            <div className="row my-4 mx-auto driver-box" key={index}>
                                <div className="item1 col-10 col-md-6 col-lg-6 col-xl-4">
                                    <div className="driver-contents">
                                        <span className="driver-field">Name:</span> {item.name}
                                    </div>
                                </div>
                                <div className="item1 col-10 col-md-6 col-lg-6 col-xl-4">
                                    <div className="driver-contents">
                                        <span className="driver-field">Email:</span> {item.email}
                                    </div>
                                </div>
                                <div className="item1 col-10 col-md-6 col-lg-6 col-xl-3">
                                    <div className="driver-contents">
                                        <span className="driver-field">Phone:</span> {item.phone}
                                    </div>
                                </div>
                                <div className="item1 col-2 col-md-6 col-lg-6 col-xl-1">
                                    <div className="driver-contents">
                                        <span className="driver-field del-btn" onClick={AgentDelete} > 
                                            <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={Agents.length == 0 ? "no-entry text-center" : "entry"}>No agent found.</div>
            </div>
        </>
    )
}

export default Agents