import request from 'superagent';

import { GETPAYMENTS } from './constants';

const parseData = data => ({
    meta: {
        name: data[0].name,
        paycount: data[0].paycount,
        company: data[0].company,
        address: data[0].address,
        teaching_hospital_name: data[0].teaching_hospital_name,
        city: data[0].city,
        zip: data[0].zip,
        physician_primary_type: data[0].physician_primary_type,
        specialtyspecific: data[0].specialtyspecific,
    },
    payments: data,
});

export default id => request.get(`${GETPAYMENTS}${id}`).then(res => parseData(res.body)).catch(err => console.error(err.message));