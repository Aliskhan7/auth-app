const AppError = require('../exeptions/api-error');
const tokenService = require('../service/token-service')

module.exports = function(req, res, next){
  try{
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader){
      return next(AppError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if(!accessToken){
      return next(AppError.UnauthorizedError())
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if(!userData){
      return next(AppError.UnauthorizedError())
    }

    res.user = userData;
    next()
  }catch(e){

  }
}