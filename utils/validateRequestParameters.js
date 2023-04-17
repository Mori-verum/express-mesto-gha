const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('./validateUrl');
const { regex } = require('./validateUrl');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
    avatar: Joi.string().custom(validateUrl)
      .message('Поле "avatar" должно быть валидным url-адресом')
      .messages({
        'string.empty': 'Поле "avatar" должно быть заполнено',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Поле "email" должно быть валидным email-адресом',
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateLoginParametrs = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Поле "email" должно быть валидным email-адресом',
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
    link: Joi.string().required().pattern(regex)
      .message('Поле "link" должно быть валидным url-адресом')
      .messages({
        'string.empty': 'Поле "link" должно быть заполнено',
      }),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'Длина id должна быть 24 символа',
        'string.hex': 'id должен быть в hex формате',
        'string.empty': 'Поле "link" должно быть заполнено',
      }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'Длина id должна быть 24 символа',
        'string.hex': 'id должен быть в hex формате',
      }),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).pattern(regex).required()
      .message('Поле "avatar" должно быть валидным url-адресом')
      .messages({
        'string.min': 'Минимальная длина поля "avatar" - 2',
        'string.empty': 'Поле "avatar" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateUserBody,
  validateLoginParametrs,
  validateCardBody,
  validateCardId,
  validateUserId,
  validateUserInfo,
  validateUserAvatar,
};
