import { isCelebrateError } from 'celebrate';

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_UNAUTHORIZED = 401;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER_ERROR = 500;

export default (err, req, res, next) => {
  if (
    isCelebrateError(err)
    || err.name === 'ValidationError'
    || err.name === 'CastError'
  ) {
    return res
      .status(ERROR_CODE_BAD_REQUEST)
      .send({ message: 'Datos inválidos' });
  }

  if (
    err.statusCode === ERROR_CODE_NOT_FOUND
    || err.name === 'DocumentNotFoundError'
  ) {
    return res.status(ERROR_CODE_NOT_FOUND).send({
      message: err.message || 'Recurso no encontrado',
    });
  }

  if (err.statusCode === ERROR_CODE_UNAUTHORIZED) {
    return res.status(ERROR_CODE_UNAUTHORIZED).send({ message: err.message });
  }

  if (err.statusCode === ERROR_CODE_FORBIDDEN) {
    return res.status(ERROR_CODE_FORBIDDEN).send({ message: err.message });
  }

  console.error(err);
  return res.status(ERROR_CODE_SERVER_ERROR).send({
    message: 'An error has occurred on the server',
  });
};
