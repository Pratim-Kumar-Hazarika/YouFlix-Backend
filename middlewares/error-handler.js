function errorHandler(err,req,res,nex){
  console.log(err.stack);
  res.status(500).json({scuess:false,message:err.message})
}

module.exports = { errorHandler };