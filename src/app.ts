import express from "express"


const app  = express() 

//Handling Uncaught Exceptions 
process.on("uncaughtException", err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1);   // in this case we don't need to close the server. Just need to come out (exit) from the process.
  })


app.use(express.json())


//import all routes 

import auth from "./routes/authRoutes"

app.use("/api/v1", auth)

const server = app.listen(8080, () => {
    console.log(
    //   `Server is listening at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
    "server running at 8080"
    );
  });
  
  
  
  //Handling Unhandled Promise Rejection 
  
  process.on("unhandledRejection", (err:any) =>{
  
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting down server due to unhandled promise rejection`);
  
    server.close(()=>{
      process.exit(1);
    })
  })
