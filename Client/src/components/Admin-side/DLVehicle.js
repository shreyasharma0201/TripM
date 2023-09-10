import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCalendarDay, faDriversLicense, faMinus } from "@fortawesome/free-solid-svg-icons";
import dl from "../images/driver-license.png"
import Alert from "./Alert";

const DLVehicle = () => {
  const navigate = useNavigate();
  const [inputFields, setinputFields] = useState([
    { vehicleClass: '', issueDate: new Date(), expiryDate: new Date() },
  ]);
  const [alert, setalert] = useState(null);
  const showAlert = (message, Type) => {
    setalert({ message: message, type: Type });
  }
  const handleAddFields = () => {
    setinputFields([...inputFields, { vehicleClass: '', issueDate: new Date(), expiryDate: new Date() }]);
  }

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    if (index !== 0) {
      values.splice(index, 1);
      setinputFields(values);
    }
  }
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setinputFields(values);
  }

  const PostData = async (e) => {
    e.preventDefault();
    for (let inputdata of inputFields) {
      const { vehicleClass, issueDate, expiryDate } = inputdata;
      const res = await fetch("/admin/add-driver/dldetails/dlvehicleclass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          vehicleClass, issueDate, expiryDate
        })
      });

      const data = await res.json();
      const getalert = new Object(data);

      if (res.status === 422 || !data) {
        window.scroll(0, 0);
        if (!showAlert(getalert.message, "danger")) {
          window.location.reload();
        } 
      }else{
        window.scroll(0, 0);
        window.alert(getalert.message);
        navigate("./admin/add-driver", true)
      }
    }
  }

  return (
    <>
      <Alert alert={alert} />
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title my-1"> Driving Licence Vehicle Class</h2>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-6">
                <div className="text-center">
                  <img src={dl} alt="user" className="image-res" />
                </div>
              </div>
              <div className="col-md-6 col-xl-6">
                <form method="POST">
                  {inputFields.map((inputField, index) => (
                    <div key={index}>
                      <div className="input-field">
                        <label htmlFor="vehicleClass" className="form-label">
                          <FontAwesomeIcon icon={faDriversLicense} /> Vehicle Class
                        </label>
                        <select
                          required
                          autoComplete="off"
                          type="text"
                          name="vehicleClass"
                          className="form-control"
                          id="vehicleClass"
                          placeholder="Vehicle Class"
                          value={inputField.vehicleClass}
                          onChange={event => handleChangeInput(index, event)}
                        >
                          <option value="MC 50cc">MC 50cc</option>
                          <option value="LMV-NT">LMV-NT</option>
                          <option value="FVG">FVG</option>
                          <option value="MC EX50CC">MC EX50CC</option>
                          <option value="MCWG">MCWG</option>
                          <option value="HGMV">HGMV</option>
                          <option value="HPMV">HPMV</option>
                        </select>
                      </div>
                      <div className="input-field">
                        <label htmlFor="issueDate" className="form-label">
                          <FontAwesomeIcon icon={faCalendarDay} /> Issue Date
                        </label>
                        <input
                          required
                          autoComplete="off"
                          type="Date"
                          name="issueDate"
                          className="form-control"
                          id="issueDate"
                          placeholder="Issue Date"
                          value={inputField.issueDate}
                          onChange={event => handleChangeInput(index, event)}
                        />
                      </div>
                      <div className="input-field">
                        <label htmlFor="expiryDate" className="form-label">
                          <FontAwesomeIcon icon={faCalendarDay} /> Expiry Date
                        </label>
                        <input
                          required
                          autoComplete="off"
                          type="Date"
                          name="expiryDate"
                          className="form-control"
                          id="expiryDate"
                          placeholder="Expiry Date"
                          value={inputField.expiryDate}
                          onChange={event => handleChangeInput(index, event)}
                        />
                      </div>
                      <div className="input-field">
                        <button type="button" className="btn btn-light" onClick={() => handleAddFields(index)}>
                          <FontAwesomeIcon icon={faAdd} />
                        </button>
                        <button type="button" className="btn mx-2 btn-light" onClick={() => handleRemoveFields(index)}>
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button type="submit" className="btn btn-outline-secondary" onClick={PostData} >
                    Add Driver
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DLVehicle;