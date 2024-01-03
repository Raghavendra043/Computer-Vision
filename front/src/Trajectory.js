import React from "react";
import './traj.css'
import ReactPlayer from "react-player";
import video from './project.mp4'
import VideoPlayer from 'react-video-js-player';

function Trajectory(){
    const videoFilePath = './video.mp4'
    return(
        <div>
            <div className="title">
            Trajectory of the Points
                
                <iframe src="https://drive.google.com/file/d/169uuj32SnF0X_o3R7TSaNE5SCBhhoHcC/preview" width="960" height="540" allow="autoplay"></iframe>
            </div>
        </div>
    )
}

export default Trajectory;