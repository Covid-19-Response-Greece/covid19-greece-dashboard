import React, { Component } from 'react'
import Chart from "chart.js";
import axios from "axios";
// This is using isMood API
import { fetchTotalInformation,fetchDailyInformation,fetchRegionsInformation } from "../Api/index.js"



export default class BreakdownDonoughtChart extends React.Component {
    chartRef = React.createRef();
    constructor(props){
      super(props)

    }

    async componentDidMount() {
      //console.log(await fetchDailyInformation())
        const myChartRef = this.chartRef.current.getContext("2d");
        let response = await axios.get("http://localhost:5000/total")
        let data = response.data.cases
        console.log(data)

        new Chart(myChartRef, {
            type: "doughnut",
            data: {
                labels: ["Active", "Deaths", "Recovered"],
                datasets: [ //TODO add critical cases
                    {
                        label: "Cases",
                        data: [data.active,data.deaths,data.recovered],
                        backgroundColor: ["#8e5ea2","#3cba9f","#e8c3b9","#c45850"]
                    }
                ]

            },
            options: {
                //Customize chart options
                title:{
                  display: true,
                  text: 'Breakdown'
                },
                legend: {
                  display: true,
                }
            }
        });
    }


    render(){

      return(

        <div>
            <canvas
                id="BreakdownDonoughtChart"
                ref={this.chartRef}
            />
        </div>

      )
    }
  }
