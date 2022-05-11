
const express = require('express');
  
const app = express();
const PORT = 9000;
  

app.use('/', (req,res)=>{
    res.send("hello");
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occured, server can't start", error);
    }
);