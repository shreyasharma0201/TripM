import React from "react";
import Navbar from './Navbar';
import Alert from "./Alert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered, faPalette, faCab, faBottleDroplet, faChair, faUser } from "@fortawesome/free-solid-svg-icons";
import agent from "../images/cars.jpg"
import { validname, validregno } from '../Validations/Validates';

const intialValues = {
    regno: "", color: "", vclass: "", model:"", fuel:"", cap: Number, owner:""
}

const Vehicle = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState(intialValues);
    const [Errors, setErrors] = useState({});

    const [alert, setalert] = useState(null);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        let currentErrors = JSON.parse(JSON.stringify(Errors));

        switch (name) {
            case 'regno':
                setValues({ ...values, regno: value });
                if (validregno(value)) {
                    currentErrors[name] = 'Please enter valid Registration No.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'color':
                setValues({ ...values, color: value });
                if (validname(value)) {
                    currentErrors[name] = 'Please enter color.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'vclass':
                setValues({ ...values, vclass: value });
                if (!value) {
                    currentErrors[name] = 'Please choose Vehicle Class.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'model':
                setValues({ ...values, model: value });
                if (!value) {
                    currentErrors[name] = 'Please enter Model.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'fuel':
                setValues({ ...values, fuel: value });
                if (!value) {
                    currentErrors[name] = 'Please choose fuel type.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'cap':
                setValues({ ...values, cap: value });
                if (!value) {
                    currentErrors[name] = 'Please fill vehicle capacity.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'owner':
                setValues({ ...values, owner: value });
                if (validname(value)) {
                    currentErrors[name] = 'Name should be 2-30 characters long.'
                } else {
                    delete currentErrors[name];
                }
                break;
            default:
                break;
        }

        setErrors(currentErrors);

    };

    const showAlert = (message, Type) => {
        setalert({message: message, type: Type});
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { regno, color, vclass, model, fuel, cap, owner } = values;

        const res = await fetch("/admin/add-vehicle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                regno, color, vclass, model, fuel, cap, owner
            })
        });

        

        // const isSuccess = false;
        const data = await res.json();
        const getalert = new Object(data);

        if (res.status === 400 || !data) {
            // window.alert(getalert.message);
            window.scroll(0, 0);
            if (showAlert(getalert.message, "danger")) { }
            else window.location.reload(); 
        } else {
            window.scroll(0, 0);
            showAlert(getalert.message, "success");
            window.location.reload();
        }
    }

    return (
        <>
            <Alert alert={alert} />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form my-1">
                            <h2 className="form-title"> Add Vehicle's Details</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="text-center mt-4">
                                    <img src={agent} alt="user" className="image-res" />
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <form method="POST">
                                    <div className="input-field">
                                        <label htmlFor="regno" className="form-label">
                                            <FontAwesomeIcon icon={faRegistered} /> Registration No.
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="regno"
                                            className="form-control"
                                            id="regno"
                                            placeholder="Registration number.."
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.regno ? 'error' : 'validation'}>{Errors.regno}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="color" className="form-label">
                                            <FontAwesomeIcon icon={faPalette} /> Color
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="color"
                                            className="form-control"
                                            id="color"
                                            placeholder="Vehicle's body color.."
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.color ? 'error' : 'validation'}>{Errors.color}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="vclass" className="form-label">
                                            <FontAwesomeIcon icon={faCab} /> Vehicle Class
                                        </label>
                                        <select
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="vclass"
                                            className="form-control"
                                            id="vclass"
                                            placeholder="Vehicle Class"
                                            onBlur={handleInputs}
                                            >
                                            <option value="MC 50cc">MC 50cc</option>
                                            <option value="LMV-NT">LMV-NT</option>
                                            <option value="FVG">FVG</option>
                                            <option value="MC EX50CC">MC EX50CC</option>
                                            <option value="MCWG">MCWG</option>
                                            <option value="HGMV">HGMV</option>
                                            <option value="HPMV">HPMV</option>
                                        </select>
                                        <span className={Errors && Errors.vclass ? 'error' : 'validation'}>{Errors.vclass}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="model" className="form-label">
                                            <FontAwesomeIcon icon={faCab} /> Model
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="model"
                                            className="form-control"
                                            id="model"
                                            placeholder="Vehicle's model"
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.model ? 'error' : 'validation'}>{Errors.model}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="fuel" className="form-label">
                                            <FontAwesomeIcon icon={faBottleDroplet} /> Fuel
                                        </label>
                                        <select
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="fuel"
                                            className="form-control"
                                            id="fuel"
                                            placeholder="Fuel type"
                                            onBlur={handleInputs}
                                        >
                                            <option value="Petrol">Petrol</option>
                                            <option value="CNG">CNG</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Bio-Diesel">Bio-Diesel</option>
                                            <option value="LPG">LPG</option>
                                            <option value="Ethanol/Methanol">Ethanol/Methanol</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                        <span className={Errors && Errors.fuel ? 'error' : 'validation'}>{Errors.fuel}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="cap" className="form-label">
                                            <FontAwesomeIcon icon={faChair} /> Seating Capacity
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="cap"
                                            className="form-control"
                                            id="cap"
                                            placeholder="Seating Capacity"
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.cap ? 'error' : 'validation'}>{Errors.cap}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="owner" className="form-label">
                                            <FontAwesomeIcon icon={faUser} /> Owner's Name
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="owner"
                                            className="form-control"
                                            id="owner"
                                            placeholder="Vehicle's owner name"
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.owner ? 'error' : 'validation'}>{Errors.owner}</span>
                                    </div>
                                    <button type="submit" className="btn btn-outline-secondary" disabled={Object.entries(Errors || {}).length > 0} onClick={PostData}>Add Vehicle</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Vehicle;
