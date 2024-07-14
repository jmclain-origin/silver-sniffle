import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { HttpError, FileSystemError } from '../../utils/errors';
import paths from '../../utils/config/paths';
export const getLogs = (req: Request, res: Response) => {
  const dateQuery = req.query.date as string;
  const logType = req.query.type as string;
  const reqDate = dateQuery ? moment(dateQuery, 'YYYY-MM-DD') : moment();
  let logFileName = `${logType}-${reqDate.format('YYYY-MM-DD')}.log`;
  const logFilePath = path.join(paths.LOGS_DIR, logFileName);
  const today = moment().format('YYYY-MM-DD');
  const isfileTypeValid = /^(app|err)$/i.test(logType);
  if (!logType || !dateQuery || !isfileTypeValid) {
    throw new HttpError(400, 'Missing required query parameters');
  }

  if (reqDate.diff(today, 'days') > 14) {
    throw new HttpError(400, 'Date must be within the last 14 days');
  }
  if (process.env.NODE_ENV === 'test') {
    logFileName = 'test-log.log';
  }

  fs.access(logFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      throw new FileSystemError('error reading log file');
    }

    const fileData = fs.readFileSync(logFilePath, 'utf8');
    res.status(200).send({ logs: fileData });
  });
};
