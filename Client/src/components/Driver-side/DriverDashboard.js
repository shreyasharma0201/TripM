import React, { useEffect, useState } from 'react'
import Carousel, { consts } from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";
import LineChart from '../Charts/LinearChart';
import PieChart from '../Charts/PieChart';
import rupee from '../images/rupee.png';

const intial = [
  { "id": "Jan", "inc": 0, "com": 0, "tps": 0 },
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

const typeinitial = [
  { "id": "Foods", "total": 0 },
  { "id": "Fuel", "total": 0 },
  { "id": "Servicing", "total": 0 },
  { "id": "Toll Tax", "total": 0 },
  { "id": "Fine", "total": 0 },
  { "id": "Others", "total": 0 },
]
const getmonth = new Date().getMonth();

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [driver, setdriver] = useState();
  const [chartdata, setchartdata] = useState(intial);
  const [week, setweek] = useState(0);
  const [year, setyear] = useState(0);
  const [piedata, setPiedata] = useState(typeinitial);
  const [upcomingtrips, setupcomingtrips] = useState([]);
  
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
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        setdriver(data.driver);
        if (data.week[0]) {
          setweek(data.week[0].total);
        }
        if (data.year[0]) {
          setyear(data.year[0].total);
        }
        for (let it of data.trip) {
          const values = [...chartdata];
          values[it._id.month - 1].inc = it.totalAmount;
          values[it._id.month - 1].com = it.commission;
          values[it._id.month - 1].tps = it.trips;
          setchartdata(values);
        }
        for (let it of data.expense) {
          const values = [...piedata];
          let ind = values.findIndex(x => x.id === it._id);
          values[ind].total = it.total;
          setPiedata(values);
        }
        setupcomingtrips(data.upcomingtrip);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callDriverPage();
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

  const Piedata = {
    labels: piedata.map((i) => i.id),
    datasets: [
      {
        label: "Total trips",
        data: piedata.map((i) => i.total),
        fill: true,
        backgroundColor: ["rgb(96, 80, 220, 0.6)",
          "rgb(213, 45, 183, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgb(255, 107, 69, 0.6)",
          "rgb(255, 171, 5, 0.6)",
          "rgba(75,192,192,0.6)"],
      },
    ]
  };

  function removeTime(date) {
    if (typeof date === 'string') {
      date = date.split('T')[0];
      return date;
    }
  }

  return (
    <>
      <div className="container-xxl mt-5">
        <h2 className='text-center main-heading'>Welcome! {driver}</h2>
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
          <div className="col-md-6 col-xl-8">
            <h4 className='text-center main-heading'>Monthly Income stats</h4>
            <LineChart data={ChartData} />
          </div>
          <div className="col-md-6 col-xl-4">
            <h4 className='text-center main-heading'>Expense stats<span> (this month)</span></h4>
            <PieChart data={Piedata} />
          </div>
        </div>
        <div className='row my-5'>
          <h4 className='text-center main-heading'>Upcoming Trips</h4>
          <Carousel enableAutoPlay autoPlaySpeed={8000}>
            {upcomingtrips.map((e, index) => (
              <div key={index} className="carosel" >
                <div className={`card card-5 carosel`}>
                  <h6 className="card-header card-text carosouel-text">Trip Date: {removeTime(e.tripDate)}</h6>
                  <div className="card-body card-text">
                    <div className='d-flex justify-content-between flex-wrap'>
                      <div>
                        <div className="carosouel-text">From:</div>
                        <div className="carosouel-subtext">{e.fromPlace}</div>
                      </div>
                      <div>
                        <div className="carosouel-text">To:</div>
                        <div className="carosouel-subtext">{e.toPlace}</div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className='d-flex justify-content-between flex-wrap'>
                      <div>
                        <div className="carosouel-text">Agent</div>
                        <div className="carosouel-subtext">{e.agent.name}</div>
                        <div className="carosouel-subtext">{e.agent.phone}</div>
                      </div>
                      <div className='div-0'>
                        <div className="carosouel-text">Vehicle</div>
                        <div className="carosouel-subtext">{e.vehicle}</div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className='d-flex justify-content-between flex-wrap'>
                      <div>
                        <div className="carosouel-text">Trip type:</div>
                        <div className="carosouel-subtext">{e.tripType}</div>
                      </div>
                      <div>
                        <div className="carosouel-text">Total KM: </div>
                        <div className="carosouel-subtext">{e.totalKM}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </Carousel>
          <div className={upcomingtrips.length == 0 ? "no-entry text-center" : "entry"}>No upcoming Trips</div>
        </div>
      </div>
    </>
  )
}

export default DriverDashboard