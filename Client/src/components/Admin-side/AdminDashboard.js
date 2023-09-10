import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import LineChart from '../Charts/LinearChart';
import BarChart from '../Charts/BarChart';
import rupee from '../images/rupee.png';

const intial = [
  { "id": "Jan", "inc": 0, "com" : 0, "tps": 0 }, 
  { "id": "Feb", "inc": 0, "com": 0, "tps": 0 }, 
  { "id": "Mar", "inc": 0, "com": 0, "tps": 0 },
  { "id": "Apr", "inc": 0, "com": 0, "tps": 0 }, 
  { "id": "May", "inc": 0, "com": 0, "tps": 0 },
  { "id": "Jun", "inc": 0, "com": 0, "tps": 0 }, 
  { "id": "Jul", "inc": 0, "com": 0, "tps": 0 }, 
  { "id": "Aug", "inc": 0, "com": 0, "tps": 0 }, 
  { "id": "Sept", "inc": 0, "com": 0, "tps": 0 },
  { "id": "Oct", "inc": 0, "com": 0, "tps": 0 },
  { "id": "Nov", "inc": 0, "com": 0, "tps": 0 },
  { "id": "Dec", "inc": 0, "com": 0, "tps": 0 },
]
const getmonth = new Date().getMonth();

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setadmin] = useState();
  const [chartdata, setchartdata] = useState(intial);
  const [week, setweek] = useState([0]);
  const [year, setyear] = useState([0]);

  const callAdminPage = async () => {
    try{
      const res = await fetch('/admin', {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type" : "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      
      // data need to rendered after loading of page hence use useState.
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }else{
        setadmin(data.admin);
        if (data.week[0]) {
          setweek(data.week[0].total);
        }
        if (data.year[0]) {
          setyear(data.year[0].total);
        }
        if(data.trip){
          for (let it of data.trip) {
            const values = [...chartdata];
            values[it._id.month - 1].inc = it.totalAmount;
            values[it._id.month - 1].com = it.commission;
            values[it._id.month - 1].tps = it.trips;
            setchartdata(values);
          }
        }
      }
    }catch(err){
      console.log(err);
    }    
  }
  
  useEffect(() => {
    callAdminPage();
  }, []);

  const ChartData = {
    labels: chartdata.map((i) => i.id),
    datasets: [
      {
        label: "Gross Income",
        data: chartdata.map((i) => i.inc),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Commission",
        data: chartdata.map((i) => i.com),
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)"
      },
      {
        label: "Net Income",
        data: chartdata.map((i) => i.inc - i.com),
        fill: false,
        backgroundColor: "rgb(255, 205, 86, 0.2)",
        borderColor: "rgb(255, 205, 86, 1)"
      }
    ]
  };

  const Bardata = {
    labels: chartdata.map((i) => i.id),
    datasets: [
      {
        label: "Total trips",
        data: chartdata.map((i) => i.tps),
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 2
      },
    ]
  };

  return (
    <>
      <div className="container-xxl mt-5">
        <h2 className='text-center main-heading'>Welcome! {admin}</h2>
        <hr></hr>
        <div className="row">
          <div className="col-md-6 col-xl-4">
            <div className="card mt-1 card-1 border-0" >
              <div className="card-body d-flex justify-content-between card-text">
                <div>
                  <h3><img src={rupee} alt="user" className="image-res" /> {week}</h3>
                </div>
                <div>
                  <h5 className="card-title">Gross Income</h5>
                  <h6 className="card-subtitle mb-2">this week</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mt-1 card-2 border-0" >
              <div className="card-body d-flex justify-content-between card-text">
                <div>
                  <h3><img src={rupee} alt="user" className="image-res" /> {chartdata[getmonth].inc}</h3>
                </div>
                <div>
                  <h5 className="card-title">Gross Income</h5>
                  <h6 className="card-subtitle mb-2">this month</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mt-1 card-3 border-0" >
              <div className="card-body d-flex justify-content-between card-text">
                <div>
                  <h3><img src={rupee} alt="user" className="image-res" /> {year}</h3>
                </div>
                <div>
                  <h5 className="card-title">Gross Income</h5>
                  <h6 className="card-subtitle mb-2">this year</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-5'>
          <div className="col-md-6 col-xl-6">
            <h4 className='text-center main-heading'>Monthly Income stats</h4>
            <LineChart data = {ChartData} />
          </div>
          <div className="col-md-6 col-xl-6">
            <h4 className='text-center main-heading'>Monthly Trip stats</h4>
            <BarChart data = {Bardata} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard