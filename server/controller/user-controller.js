const userService = require('../service/user-service');
class UserController {
  async registration(req, res, next){
    try{
      const {email, password} = res.body;
      console.log(email);
      const userData = await userService.registration(email, password)
      res.cookies('refreshToken', userData.refreshToken, {maxAge: 30 + 40 + 60 + 60 + 1000, httpOnly: true})
      return res.json(userData)
    }catch (e) {
      console.log(e);
    }
  }
  async login(req, res, next){
    try{

    }catch (e) {
      console.log(e);
    }
  }
  async logout(req, res, next){
    try{

    }catch (e) {
      console.log(e);
    }
  }
  async activate(req, res, next){
    try{

    }catch (e) {
      console.log(e);
    }
  }
  async refresh(req, res, next){
    try{

    }catch (e) {
      console.log(e);
    }
  }
  async getUsers(req, res, next){
    try{


    }catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserController()