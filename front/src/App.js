
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import First from "./first.js"

import LineChart from "./Graphs.js"
// import c from './images/cols.jpg'
// import r from './images/rows.jpg'
// import labels from './images/subhash.jpg'
// import video from './images/video.mp4'

// import X from './images/starinX.mp4'
// import Y from './images/StrainY.mp4'
// import Z from './images/strainZ.mp4'


const App = () => {
  const [image, setImage] = useState(null)
  const canvas = useRef(null)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [data, setData] = useState();
  const [list1, setList] = useState();
  
  
  

  

  return (

    <div>
      <First/>
    </div>
    
  )
}

export default App