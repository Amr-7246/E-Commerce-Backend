import logger from 'jet-logger';

import ENV from '@src/constants/ENV';
import app from './app';
import connectDB from './config/db';

const SERVER_START_MSG = ('Ok Amr, Your server started without any errors on port: ' + ENV.Port.toString());


connectDB().then(() => {
    app.listen(ENV.Port, () => logger.info(SERVER_START_MSG));
})