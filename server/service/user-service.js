const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')
const AppError = require('../exeptions/api-error')

class UserService{
  async registration(email, password) {
    const candidate = await UserModel.findOne({email})
    if (candidate) {
      throw AppError.BadRequest(`Пользователь с таким ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    const user = await UserModel.create({email, password: hashPassword, activationLink})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateToken({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  async activate(activationLink){
    const user = await UserModel.findOne({activationLink});

    if(!user){
      throw AppError.BadRequest('Некорректная ссылка');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password){
    const user = await UserModel.findOne({email})

    if(!user){
      return AppError.BadRequest('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if(!isPassEquals){
      return AppError.BadRequest('Неверный пароль')
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  async logout(refreshToken){
    const token  = await tokenService.removeToken(refreshToken)
    return token
  }
}

module.exports = new UserService()