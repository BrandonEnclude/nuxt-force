// Validation
const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = (data) => {
   const schema = Joi.object({
      firstName: Joi.string().max(255).required(),
      lastName: Joi.string().max(255).required(),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(255).required(),
   })
   return schema.validate(data)
}

// Login Validation
const loginValidation = (data) => {
   const schema = Joi.object({
      firstName: Joi.string().optional().allow(''),
      lastName: Joi.string().optional().allow(''),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(255).required(),
   })
   return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation