function routeHandler(req,res){
  res.status(404).json({sucess:false,message:"The route you are requesting doesn't exist"})
}

module.exports = { routeHandler }