import React, { Component, useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';
import './Graphs.css'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function LineChart ({Data, Nodes}){
    const [Options, setOptions] = useState(null);

    useEffect(()=>{
        console.log('from graphs', Data['traj'])
        const traj = Data['traj']
        const nodes = Object.keys(traj)
        var old = [];
        for(var j=0;j<Nodes.length;j++){
            var options = {
                zoomEnabled: true,
                animationEnabled: true,
                exportEnabled: true,
                theme: "light2", // "light1", "dark1", "dark2"
                title:{
                    text: ``
                },
                axisY: {
                    title: "Coordinates",
                    includeZero: false,
                    suffix: ""
                },
                axisX: {
                    title: "Time Frame",
                    prefix: "",
                    interval: 20
                },
                data: [{
                    type: "line",
                    toolTipContent: "Time {x}: {y}%",
                    dataPoints: []
                }]
            }
            var cord = []
            for(var i=0;i<Data['traj'][nodes[j]]['X'].length;i++){
                cord.push({'x':i+1, 'y':Data['traj'][nodes[j]]['X'][i]})
            }

            options.data[0].dataPoints = cord;
            options.theme = "light1"
            old.push(options)

            var options = {
                zoomEnabled: true,
                animationEnabled: true,
                exportEnabled: true,
                theme: "light2", // "light1", "dark1", "dark2"
                title:{
                    text: ``
                },
                axisY: {
                    title: "Coordinates",
                    includeZero: false,
                    suffix: "%"
                },
                axisX: {
                    title: "Time Frame",
                    prefix: "",
                    interval: 20
                },
                data: [{
                    type: "line",
                    toolTipContent: "Time {x}: {y}%",
                    dataPoints: []
                }]
            }

            var cord1 = []
            for(var i=0;i<Data['traj'][nodes[j]]['Y'].length;i++){
                cord1.push({'x':i+1, 'y':Data['traj'][nodes[j]]['Y'][i]})
            }
            
            options.data[0].dataPoints = cord1;
            options.theme = "dark1"
            old.push(options)
            
            var options = {
                zoomEnabled: true,
                animationEnabled: true,
                exportEnabled: true,
                theme: "light2", // "light1", "dark1", "dark2"
                title:{
                    text: ``
                },
                axisY: {
                    title: "Coordinates",
                    includeZero: false,
                    suffix: "%"
                },
                axisX: {
                    title: "Time Frame",
                    prefix: "",
                    interval: 20
                },
                data: [{
                    type: "line",
                    toolTipContent: "Time {x}: {y}%",
                    dataPoints: []
                }]
            }

            var cord2 = []
            for(var i=0;i<Data['traj'][nodes[j]]['Y'].length;i++){
                cord2.push({'x':Data['traj'][nodes[j]]['X'][i], 'y':Data['traj'][nodes[j]]['Y'][i]})
            }
            
            options.data[0].dataPoints = cord2;
            options.theme = "light2"
            old.push(options)

            console.log(old)
            
        }
    
        setOptions(old)
    }, [])
	// render() {
		
		
		return (
		<div>
			<div style={{textAlign:"center", fontSize:"60px"}}>Graphs</div>
			{Options && Options.length === 3* Nodes.length && Nodes.map((value , index)=>{
                index*=3
                

                return(
                <>
                <div className="nodetitle"><h1><b>Node number : {value}</b></h1></div>
                
                <div style={{display:"flex"}}>
                    <div className="axis">X</div>
                    <div className="graphx"><CanvasJSChart options = {Options[index]}/></div>
                    <div className="desy"><div style={{textAlign:"center", marginTop:"50px"}}><b>X coordinate <br/>VS<br/>Time Frame</b></div></div>
                </div>
                <div className="Y">
                    <div className="desy"><div style={{textAlign:"center", marginTop:"50px"}}><b>Y coordinate <br/>VS<br/>Time Frame</b></div></div>
                    <div className="graphy"><CanvasJSChart options = {Options[index+1]}/></div>
                    <div className="axisy">Y</div>
                </div>
                <div style={{display:"flex"}}>
                    <div className="axis">XY</div>
                    <div className="graphx"><CanvasJSChart options = {Options[index+2]}/></div>
                    <div className="desy"><div style={{textAlign:"center", marginTop:"50px"}}><b>XY coordinate <br/>VS<br/>Time Frame</b></div></div>
                </div>   
                <hr className="line"/>  
                </>
                
            
            )
            
            })
            }
			
		</div>
		);
	
}

// export default LineChart;                           