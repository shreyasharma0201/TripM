import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";

function Trips() {
    const [today, setToday] = useState([]);
    const [past, setpast] = useState([]);
    const [upcoming, setupcoming] = useState([]);

    const callTripsPage = async () => {
        try {
            const res = await fetch('/driver/trips', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                setToday(data.todayTrips);
                setupcoming(data.upcomingtrip);
                setpast(data.pastTrips);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callTripsPage();
    }, [])

    function removeTime(date) {
        if (typeof date === 'string') {
            date = date.split('T')[0];
            return date;
        }
    }
    return (
        <div className="container-xxl mx-auto">
            <div className='content m-2'>
                <div className='row mt-4'>
                    <h4 className='main-heading'>Today's Trips</h4>
                    <table className="table table-striped table-hover table-bordered">
                        <thead className='table-secondary'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Vehicle</th>
                                <th scope="col">Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {today.map((e, index) => (
                                
                                <tr key={index}>
                                    <th scope='row'><NavLink className="link" to={`${e._id}`}>{index + 1}</NavLink></th>
                                    <td>{removeTime(e.tripDate)}</td>
                                    <td>{e.vehicle}</td>
                                    <td>{e.cid.name}</td>
                                </tr>
                                
                            ))}
                        </tbody>

                    </table>
                </div>
                <div className='row mt-4'>
                    <h4 className='main-heading'>Upcoming Trips</h4>
                    <table className="table table-striped table-hover table-bordered">
                        <thead className='table-secondary'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Vehicle</th>
                                <th scope="col">Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcoming.map((e, index) => (
                                
                                <tr key={index}>
                                    <th scope='row'><NavLink className="link" to={`${e._id}`}>{index + 1}</NavLink></th>
                                    <td>{removeTime(e.tripDate)}</td>
                                    <td>{e.vehicle}</td>
                                    <td>{e.cid.name}</td>
                                </tr>
                                
                            ))}
                        </tbody>

                    </table>
                </div>
                <div className='row mt-4'>
                    <h4 className='main-heading'>Past Trips</h4>
                    <table className="table table-striped table-hover table-bordered">
                        <thead className='table-secondary'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Vehicle</th>
                                <th scope="col">Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {past.map((e, index) => (
                                
                                <tr key={index}>
                                    <th scope='row'><NavLink className="link" to={`${e._id}`}>{index + 1}</NavLink></th>
                                    <td>{removeTime(e.tripDate)}</td>
                                    <td>{e.vehicle}</td>
                                    <td>{e.cid.name}</td>
                                </tr>
                                
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>


    )
}

export default Trips