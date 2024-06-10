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
      next(e);
    }
  }
  async login(req, res, next){
    try{

    }catch (e) {
      next(e);
    }
  }
  async logout(req, res, next){
    try{

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