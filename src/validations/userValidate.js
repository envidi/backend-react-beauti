/* eslint-disable @stylistic/js/quotes */
import Joi from 'joi'

const userValidate = Joi.object({
  username: Joi.string().required().min(2).max(255).label('name').messages({
    'string.empty': `{{ #label }} is 'required'`
  }),
  email: Joi.string().email().required().label('email').messages({
    'string.empty': `{{ #label }} is 'required'`
  }),
  password: Joi.string().required().min(6).max(255).label('password').messages({
    'string.empty': `{{ #label }} is 'required'`
  }),
  confirmPassword: Joi.string().required().min(6).max(255).label('confirmPassword').messages({
    'string.empty': `{{ #label }} is 'required'`
  }),

}).options({
  abortEarly: false
})
export default userValidate
