import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "some-secret-key";

export default (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("Se requiere autorización");
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    const authorizationError = new Error("Token no válido");
    authorizationError.statusCode = 401;
    return next(authorizationError);
  }
};
