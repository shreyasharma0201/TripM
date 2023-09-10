import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
const Logout = () => {
    
    const navigate = useNavigate();
    const callLogoutBackend = async () => {
        try {
            const res = await fetch('/admin-logout', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            navigate('/');
            await res.json();
            // data need to rendered after loading of page hence use useState.
            if (res.status != 200) {
                const error = new Error(res.error);
                throw error;
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callLogoutBackend();
    }, []);

    return (
      <>
       <h2 className='text-center'>Logging Out....</h2>
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className="spinner-border text-info" role="status" style={{ width: '10rem', height: '10rem' }}>
                <h1><span className="sr-only">Loading...</span></h1>
            </div>
        </div>
      </>
    )
}

export default Logout