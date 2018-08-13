import request from 'superagent';

import { GETPAYMENTS } from './constants';

const parseData = data => console.log(data);

export default id => request.get(`${GETPAYMENTS}${id}`).then(res => parseData(res.body)).catch(err => console.error(err.message));