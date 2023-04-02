import { Request, Response, NextFunction } from 'express';
import { get_developer_by_email_from_cache } from "../cache/developer.cache";
import { UNAUTHORIZED_ACCESS, INVALID_DEVELOPER_EMAIL } from '../utils/constants';

// Middleware to logged in dev by email
export function authenticate_dev_email(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body
    get_developer_by_email_from_cache(email)
      .then(_ => next())
      .catch(_ => res.status(UNAUTHORIZED_ACCESS).send({ status: UNAUTHORIZED_ACCESS, message: INVALID_DEVELOPER_EMAIL }))
  } catch (err) {
    res.status(UNAUTHORIZED_ACCESS).send({ status: UNAUTHORIZED_ACCESS, message: INVALID_DEVELOPER_EMAIL })
  }
}