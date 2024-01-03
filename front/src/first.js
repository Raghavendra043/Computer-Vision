import React, { useEffect, useState } from "react";
import axios from "axios";
import './first.css'
import './traj.css'
import Trajectory from "./Trajectory";
import { Messaging } from "react-cssfx-loading";
// Better way to reduce bundle size
import "react-cssfx-loading/lib/Messaging";

import ColorMap from "./Colormap";
import Nodesdes from "./Nodes";
import ReactPlayer from "react-player";
import LineChart from "./Graphs";
import StrainDes from "./StrainDes";


var x = 50
var y = 50
var count = 1;
var points = []
for(var i=0;i<9;i++){
    for(var j=0;j<18;j++){
        points.push([x, y]);
        count++;
        x+=50;
    }
    x = 50
    y+=50;
}

function First({data}){
    const [image, setimage] = useState();
    const [Nodes, setNodes] = useState([]);
    const [Data, setData] = useState(null);
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [upload, setUpload] = useState(null);

    const do1  = (rows, cols)=>{

        // var ctx = document.getElementById('myCanvas').getContext('2d');
        // var imageData = image;
        // for(var y = 0; y < imageData.length; y++){
        //     for(var x = 0; x < imageData[y].length; x++){
        //     ctx.fillStyle = `rgb(${imageData[y][x][2]}, ${imageData[y][x][1]}, ${imageData[y][x][0]})`; 
        //     ctx.fillRect( x, y, 1, 1 );
        // }
        // }

        var ctx = document.getElementById('label').getContext('2d');
        ctx.font = "18px verdana, sans-serif ";
        ctx.fillStyle = "white"
        var x = 50
        var y = 50
        var count = 1;
        for(var i=0;i<rows;i++){
            for(var j=0;j<cols;j++){
                ctx.fillText(count, x, y);
                // ctx.stroke();
                count++;
                x+=50;
            }
            x = 50
            y+=50;
        }

    }
    const clickme = (e)=>{
        const canvas =  document.getElementById('label');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log(x, y); 
        var data= getnear(x, y);
        var near =  data[0]
        var co = data[1] 
        
        console.log("near point = ",near )        
        
        var ctx = document.getElementById('label').getContext('2d');
        ctx.clearRect(co[0]-10, co[1]-30, 50, 50);
        ctx.font = "bold 19px verdana, sans-serif ";
        ctx.fillStyle = "blue";
        ctx.fillText(near, co[0], co[1]);
        setNodes([...Nodes, near])

    }

    const handleVideoUpload = async(event) => {
        setVideoFilePath(URL.createObjectURL(event.target.files[0]));
        console.log(URL.createObjectURL(event.target.files[0]));
        var loc = 'C:/Users/raghavendra/Documents/computer vision/video.mp4'
        
        await getData(loc)
        console.log("this is done and wont repeate");
        };

    const getData= async(loc)=>{

        var data = await axios.post(`${process.env.REACT_APP_BACK}/wel`, {"loc":loc, "x":1})
        console.log(data.data);
        setData(data.data)
        do1(data.data['rows'],data.data['cols']);

        //data = await axios.post(`${process.env.REACT_APP_BACK}/wel`, {"loc":loc, "x":2})
        ///console.log("second data",data.data);
        //setData({...Data, ...data.data})
        
    }

    const pro = async()=>{
        try{
            document.getElementById("loading").style.display = "block"
            document.getElementById("load").style.display="block"
            document.getElementById("pro").style.display = "none"
            var loc = 'C:/Users/raghavendra/Documents/computer vision/video.mp4'
            const data = await axios.post(`${process.env.REACT_APP_BACK}/wel`, {"loc":loc, "x":2, "nodes":Nodes})
            console.log("second data", data.data)
            setData({...Data, ...data.data})
            document.getElementById("loading").style.display = "none"
            document.getElementById("pro").style.display = "none"
            document.getElementById("load").style.display="none"
            
        } catch(Error){
            console.log(Error)

        }
        

    }
    const getnear=(x, y)=>{
        var min = 10000;
        var no = 0;
        var co = [0, 0]
        for(var j=0;j<points.length;j++){

            var d = Math.abs(points[j][0]-x) + Math.abs(points[j][1]-y)
            if(d<min){
                min= d;
                no = j+1;
                co = [points[j][0], points[j][1]]
            }
        }
        return [no, co];
    }
    return(
        <div>

        

        <div id="header">
            Deformation Analysis
        </div>
        
        <div className="main">
            <div className="des">
                <b>Deformation Analysis with OpenCV:</b> <br/><br/>
                Understanding the Stress and Strian distribution across the multiple positions of a structures helps a
lot to come up with technologies to overcome Natural disasters. We would like to propose a
solution to analyse the deformations in the Structures based on Computer Vision and multi point
tracking.
It is normally difficult to understand the deformation of the object when it is undergoing the
deformation process as it can happen fast enough and we don’t have enough time to observe the
changes.
            </div>
            <div className="video">
                <div className="inside">
                {!upload && <div>
                    <div className="choose">Choose an Option</div>
                    <ul>
                        <li className="list"> <input type="checkbox"/> Real Time </li>
                        <li className="list"> <input type="checkbox" /> Upload a video </li>
                    </ul>
                    <button className="next" onClick={()=>{
                        setUpload(true)
                    }}> Next </button>
                    </div>}
                    { upload && !videoFilePath ? <input type="file" onChange={handleVideoUpload} placeholder="Upload video"/>:<></>}
                
                </div>

                {upload && <ReactPlayer style= {{position:"relative", left:"5%"}} url={videoFilePath} width="90%" controls={true} />}
                

            </div>
        </div>

        

        <div className="data" id="data">

        <div>
            <div className="title">Labels</div>

            <div style={{textAlign:"center"}}>
                <canvas id="label" width="960" height="540" style={{background:"black"}}
                    onClick={clickme}
                ></canvas>
            </div>
        </div>

        { Data && Nodes ? <Nodesdes {...{"Data":Data, "Nodes":Nodes}}/>:<></> }
        
        <div id="pro" className="pro" style={{textAlign:"center", marginBottom:"50px"}}><button className="process"
            onClick={pro}
        >Process</button></div>
        
        <div id="loading" style={{textAlign:"center", marginLeft:"45vw", marginTop:"50px", display:"none"}}>
            <Messaging color="white" width="30px" height="30px" />
        </div>
        <div id="load" className="load" style={{display:"none"}}>Please wait loading</div>

        {Data && Data['traj'] &&
            <Trajectory/>
            }
          
        {Data && Data['traj'] && <LineChart  {...{"Data":Data, 'Nodes':Nodes}}/>}
        
        
        {/* {Data && Data['traj'] && */}
            < ColorMap/>
            {/* } */}
        {/* {Data && Data['traj'] && */}
            <StrainDes/>
            {/* }     */}
            
            
            </div>
        </div>
    )
}

export default First;