const mongoose = require("mongoose");

async function initalizeConnection(){
  const uri =process.env.URI
      try{
        await mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})
      console.log("Connection established successfully with the database..")
      }catch(error){
        console.log("Connection couldn't be established with database..")
      }
}

module.exports = { initalizeConnection }