import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";



export default function LineChart(props) {
    return (
        <div className="line my-4">
            <Line data={props.data} />
        </div>
    );
}
