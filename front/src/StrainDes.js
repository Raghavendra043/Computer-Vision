import React from "react";
import './traj.css'

export default function StrainDes(){

    return(
        <>
        <div className="title">
            Strain Description
        </div>

        <div className="desframe"> The Strain at every frame is calculated as the ratio of difference between the distance of adjacent nodes at any frame F and the distance between them initially (Frame 0) along X and Y axis Respectively.<br/>Please enter the time at which yu want to analyse the Strain Values</div>
        <div className="input1">Enter the time : <input type="number"/> <button> Go </button></div>
        </>
    )
}