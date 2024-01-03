import React, { useState } from "react";
import './traj.css'
import './first.css'

function Nodesdes({Data, Nodes}){
    console.log(Data)
    return(
        <div>

<div className="main">
            <div className="des1">
                <b>Nodes Description:</b> <br/><br/>
                Number of Nodes : {Data .count}<br/>
                Number of Rows : {Data.rows}<br/>
                Number of Columns : {Data.cols}<br/>
            </div>

            <div className="">
                <div className="">
                {Nodes && 
        
        <div className="nodes">
        
        <div style={{marginBottom:"20px", fontSize:"1.5em"}}>
            Selected Nodes
        </div>
        
                <div className="nodebox">
                    {Nodes.map((key, index)=>(
                        
                        <div className="box">{key}</div>

                    ))}
                </div>
                </div>
                }
                </div>

            </div>
        </div>

            
        </div>
    )
}

export default Nodesdes;