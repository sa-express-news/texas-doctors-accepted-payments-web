import request from 'superagent';

import { GETDOCTORS } from './constants';

class Doctors {
    constructor(data, pageLen=10) {
        this.data       = data;
        this.pageLen    = pageLen;
        this.page       = 1;
        this.start      = 0;
        this.stop       = this.pageLen;
        this.limit      = this.setLimit();
        this.pageCount  = this.setPageCount();
        this.current    = this.setCurrent();
    }

    setLimit() {
        return window.innerWidth > 500 ? 7 : 4;
    }

    setPageCount() {
        return Math.ceil(this.data.length / this.pageLen);
    }

    setCurrent() {
        this.stop  = this.page * this.pageLen;
        this.start = this.stop - this.pageLen;
        return this.data.slice(this.start, this.stop);
    }

    setPage(page) {
        this.page       = page || 1;
        this.current    = this.setCurrent();
    }

    getSnapshot() {
        const { current, pageCount, page, limit, data, start, stop } = this;
        return {
            doctors: current,
            pagination: {
                pageCount,
                page,
            },
            meta: {
                len: data.length,
                start : start + 1,
                stop: stop < data.length ? stop : data.length,
            },
            limit,
        }
    }
}

const parseData = data => new Doctors(data, 30);

export default text => request.get(`${GETDOCTORS}${text}`).then(res => parseData(res.body)).catch(err => console.error(err.message));