
import React, { Component } from 'react'
import Chart from "chart.js";
import axios from "axios";
// This is using isMood API
import { fetchTotalInformation,fetchDailyInformation,fetchRegionsInformation } from "../Api/index.js"



export default class MainLineChart extends React.Component {
    chartRef = React.createRef();
    constructor(props){
      super(props)

    }

    async componentDidMount() {
      //console.log(await fetchDailyInformation())

        const myChartRef = this.chartRef.current.getContext("2d");
        let response = await axios.get("http://localhost:5000/all")
        let data = response.data.cases

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: data.map(e=>e.date),
                datasets: [ //TODO add critical cases
                    {
                        label: "Confirmed Cases",
                        data: data.map(e=>e.confirmed),
                        borderColor: "blue"
                    },
                    {
                        label: "Active Cases",
                        data: data.map(e=>e.active),
                        borderColor: "orange"
                    },
                    {
                        label: "Recovered Cases",
                        data: data.map(e=>e.recovered),
                        borderColor: "cyan"
                    },
                    {
                        label: "Deaths",
                        data: data.map(e=>e.deaths),
                        borderColor: "black"
                    }
                ]

            },
            options: {
                //Customize chart options
                title:{
                  display: true,
                  text: 'Number of cases'
                },
                legend: {
                  display: true,
                }
            }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="MainLineChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
