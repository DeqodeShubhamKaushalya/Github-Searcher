import moment from 'moment';
import { createLogger, format, transports } from 'winston';

const year = moment().format('Y');
const month = moment().format('MMMM');
const day = moment().format('DD');
const logger = createLogger({
  transports: new transports.File({
    filename: `logs/${year}/${month}/${day}/log_${year}_${month}_${day}.log`,
    format: format.combine(
      format.errors({ stack: true }),
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.printf((info) => {
        if (typeof info.message === 'object') {
          info.message = JSON.stringify(info.message, null, 3);
        }

        return `${info.level}: ${[info.timestamp]}: ${info.message}`;
      }),
    ),
  }),
});

export default logger;
