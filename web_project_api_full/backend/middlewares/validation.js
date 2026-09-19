import { celebrate, Joi } from 'celebrate';
import validator from 'validator';

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
};

const userId = Joi.string().hex().length(24).required();
const cardIdParams = Joi.object({ cardId: userId });
const userIdParams = Joi.object({ userId });
const authHeaders = Joi.object({
  authorization: Joi.string()
    .pattern(/^Bearer\s+\S+$/)
    .required(),
}).unknown(true);

const credentials = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signupBody = credentials.keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().custom(validateURL),
});

const profileBody = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
});

const avatarBody = Joi.object({
  avatar: Joi.string().custom(validateURL).required(),
});

const cardBody = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().custom(validateURL).required(),
});

export const validateAuthHeaders = celebrate({
  headers: authHeaders,
});

export const validateSignin = celebrate({
  body: credentials,
});

export const validateSignup = celebrate({
  body: signupBody,
});

export const validateUserId = celebrate({
  params: userIdParams,
});

export const validateProfile = celebrate({
  body: profileBody,
});

export const validateAvatar = celebrate({
  body: avatarBody,
});

export const validateCard = celebrate({
  body: cardBody,
});

export const validateCardId = celebrate({
  params: cardIdParams,
});
