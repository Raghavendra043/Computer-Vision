import React from "react";
import './traj.css'
import x1 from './x1.mp4'
import x2 from './x2.mp4'
import y1 from './y1.mp4'
import y2 from './y2.mp4'

function ColorMap(){
    return(
        <div>
            <div className="title">
                ColorMap
            </div>
            <div className="desframe"> Colors are given to an area of Pixels based on the Strain Calculations of the nearby Nodes. Strain in the X axis : D(Node(i, Frame)-Node(i+1, Frame)) / D(Node(i, 0)-Node(i+1, 0)). </div>
            <div style={{marginLeft:"100px", fontSize:"30px"}}> X Axis </div><br/><br/>
            <div className="videos">
                
                <div style={{marginRight:"150px"}}><video width="480" height="270" controls >
                    <source src={x1} type="video/mp4"/>
                </video></div>
                <div style={{}}> <video width="480" height="270" controls >
                    <source src={x2} type="video/mp4"/>
                </video></div>
            </div>

            <div style={{marginLeft:"100px", fontSize:"30px"}}> Y Axis </div><br/><br/>
            <div className="videos">
                
                <div style={{marginRight:"150px"}}><video width="480" height="270" controls >
                    <source src={y1} type="video/mp4"/>
                </video></div>
                <div style={{}}> <video width="480" height="270" controls >
                    <source src={y2} type="video/mp4"/>
                </video></div>
            </div>

            <div style={{marginLeft:"100px", fontSize:"30px"}}> Principle Axis </div><br/><br/>
            <div className="videos">
                
                <div style={{marginRight:"150px"}}><video width="480" height="270" controls >
                    <source src={x1} type="video/mp4"/>
                </video></div>
                <div style={{}}> <video width="480" height="270" controls >
                    <source src={x1} type="video/mp4"/>
                </video></div>
            </div>

            
            
        </div>
    )
}

export default ColorMap;