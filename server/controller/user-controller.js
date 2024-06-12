const userService = require('../service/user-service');
const {validationResult} = require('express-validator')
const ApiError = require("../exeptions/api-error")

class UserController {
  async registration(req, res, next){
    try{
      const {email, password} = res.body;
      if(!errors.isEmpty()){
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const userData = await userService.registration(email, password)
      res.cookies('refreshToken', userData.refreshToken, {maxAge: 30 + 40 + 60 + 60 + 1000, httpOnly: true})
      return res.json(userData)
    }catch (e) {
      next(e);
    }
  }
  async login(req, res, next){
    try{
      const {email, password} = req.body;
      const userData = await userService.login(email, password);
      res.cookies('refreshToken', userData.refreshToken, {maxAge: 30 + 40 + 60 + 60 + 1000, httpOnly: true});
      return res.json(userData)
    }catch (e) {
      next(e);
    }
  }
  async logout(req, res, next){
    try{
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken');
      return res.json(token)
    }catch (e) {
      next(e);
    }
  }
  async activate(req, res, next){
    try{
      const activationLink = res.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL)
    }catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next){
    try{
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken)
      res.cookies('refreshToken', userData.refreshToken, {maxAge: 30 + 40 + 60 + 60 + 1000, httpOnly: true})
      return res.json(userData)
    }catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next){
    try{


    }catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController()