import * as jwt from 'jsonwebtoken';

export const getUserFromToken = req => {
  let res = {
    payload: undefined,
    status: undefined,
  };
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'secretKey', (err, payload) => {
      if (!err) {
        // confirm identity and check user permissions
        res = payload.email;
      } else {
        res.status = 403;
      }
    });
  } else {
    res.status = 401;
  }
  return res;
};
