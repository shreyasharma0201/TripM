import React from "react";
import Navbar from './Navbar';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faDriversLicense, faPhone, faLock, faUserAlt, faMessage } from "@fortawesome/free-solid-svg-icons";
import driver from "../images/driver1.png"
import { validname, validEmail, validpassword, validphone, validcpassword } from '../Validations/Validates';
import Alert from "./Alert";

const Ddetails = () => {
    const [alert, setalert] = useState(null);
    const navigate = useNavigate();
    const [values, setValues] = useState(
        { name: "", email: "", phone: Number, city: "", DLNo: "", password: "", cpassword: "" }
    );
    const [Errors, setErrors] = useState({});
    
    const showAlert = (message, Type) => {
        setalert({ message: message, type: Type });
    }
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        let currentErrors = JSON.parse(JSON.stringify(Errors));

        switch (name) {
            case 'name':
                const str2 = value.charAt(0).toUpperCase() + value.slice(1);
                setValues({ ...values, name: str2 });
                if (validname(value)) {
                    currentErrors[name] = 'Name should have 2-30 characters.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'email':
                setValues({ ...values, email: value });
                if (!value || validEmail(value)) {
                    currentErrors[name] = 'Please fill email properly.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'phone':
                setValues({ ...values, phone: value });
                if (validphone(value)) {
                    currentErrors[name] = 'Phone no. should be 10 digits.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'DLNo':
                setValues({ ...values, DLNo: value });
                if (!value) {
                    currentErrors[name] = 'Please enter valid DL number.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'city':
                setValues({ ...values, city: value });
                if (!value) {
                    currentErrors[name] = 'Please enter valid city name.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'password':
                setValues({ ...values, password: value });
                if (validpassword(value)) {
                    currentErrors[name] = 'Password should be 6-15 characters with an upper case, a lower case, a number and a special character to make it strong'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'cpassword':
                let valid = validcpassword(
                    values.password,
                    value,
                    currentErrors
                );
                if (valid) {
                    setValues({ ...values, cpassword: value });
                }
                break;
            default:
                break;
        }

        setErrors(currentErrors);
    };

    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, phone, city, DLNo, password, cpassword } = values;

        const res = await fetch("/admin/add-driver", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                name, email, phone, city, DLNo, password, cpassword
            })
        });

        const data = await res.json();
        const getalert = new Object(data);

        if (res.status === 422 || !data) {
            window.scroll(0, 0);
            if (!showAlert(getalert.message, "danger")) {
                window.location.reload();
            } 
        } else {
            window.scroll(0, 0);
            navigate('/admin/add-driver/dldetails', { replace: true });
        }
    }

    return (
        <>
            <Alert alert={alert} />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title mb-2"> Add Driver's Details</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="text-center mt-4">
                                    <img src={driver} alt="user" className="image-res" />
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <form method="POST">
                                    <div className="input-field">
                                        <label htmlFor="name" className="form-label">
                                            <FontAwesomeIcon icon={faUserAlt} /> Name
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            placeholder="Driver's name"
                                            onBlur={handleInputs}
                                            formNoValidate
                                        />
                                        <span className={Errors && Errors.name ? 'error' : 'validation'}>{Errors.name}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="email" className="form-label">
                                            <FontAwesomeIcon icon={faMessage} /> Email ID
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Driver's email id"
                                            formNoValidate
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.email ? 'error' : 'validation'}>{Errors.email}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="phone" className="form-label">
                                            <FontAwesomeIcon icon={faPhone} /> Phone
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="Number"
                                            name="phone"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Driver's phone number"
                                            formNoValidate
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.phone ? 'error' : 'validation'}>{Errors.phone}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="city" className="form-label">
                                            <FontAwesomeIcon icon={faCity} /> City
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            name="city"
                                            className="form-control"
                                            id="city"
                                            placeholder="Driver's city"
                                            onBlur={handleInputs}
                                            formNoValidate
                                        />
                                        <span className={Errors && Errors.city ? 'error' : 'validation'}>{Errors.city}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="DLNo" className="form-label">
                                            <FontAwesomeIcon icon={faDriversLicense} /> Driving Licence No.
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            name="DLNo"
                                            className="form-control"
                                            id="DLNo"
                                            placeholder="Driver's DL no. "
                                            formNoValidate
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.DLNo ? 'error' : 'validation'}>{Errors.DLNo}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="password" className="form-label">
                                            <FontAwesomeIcon icon={faLock} /> Password
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Set driver's password"
                                            onBlur={handleInputs}
                                            formNoValidate
                                        />
                                        <span className={Errors && Errors.password ? 'error' : 'validation'}>{Errors.password}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="cpassword" className="form-label">
                                            <FontAwesomeIcon icon={faLock} /> Confirm Password
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="password"
                                            name="cpassword"
                                            className="form-control"
                                            id="cpassword"
                                            placeholder="Confirm driver's password"
                                            onBlur={handleInputs}
                                            formNoValidate
                                        />
                                        <span className={Errors && Errors.cpassword ? 'error' : 'validation'}>{Errors.cpassword}</span>
                                    </div>

                                    <button type="submit" className="btn btn-outline-secondary" disabled={Object.entries(Errors || {}).length > 0} onClick={PostData}>Save & Next</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Ddetails;
