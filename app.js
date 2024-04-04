 const express = require('express')
 const {connectToDb, getDb }= require('./db1')

 const app = express()

 //db connection
 let db
 connectToDb((err)=>{
   if(!err){
      app.listen(3000, ()=> {
         console.log('app listenin on port 3000')
      })
      db=getDb()
   }

 })

 //routes
 app.get('/person',(req,res)=> {

   db.cpllection('person')
      .find()

    res.json({mssg:"welcome to the api"})
 })