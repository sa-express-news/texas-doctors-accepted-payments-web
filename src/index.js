// import js files
import render       from './scripts/render-template';
import getDoctors   from './scripts/get-doctors.js';
import getPayments   from './scripts/get-payments.js';

// import stylesheets files
import './styles/main.scss';


class DoctorPayments {
    constructor(config) {
        this.render         = config.render;
        this.getDoctors     = config.getDoctors;
        this.getPayments    = config.getPayments;
        this.input          = config.input;
        this.button         = config.button;
        this.Paginate       = config.Paginate;
        this.parent         = this.getParent(config.wcmWrapper);
        this.main           = this.getMain();

        this.doctors    = {};
        this.payments   = {};
        this.state      = {};

        this.renderDoctors = this.renderDoctors.bind(this);

        this.bindToParent();
        this.bindInputSubmit();
        this.bindButtonSubmit();

        window.onscroll = this.setStickyNav(config.formGroup);
    }

    getParent(wcmWrapper) {
        return wcmWrapper ? wcmWrapper : document.body;
    }

    getMain() {
        const el = document.createElement('div');
        el.classList.add('main');
        return el;
    }

    bindToParent() {
        this.parent.appendChild(this.main);
    }

    bindInputSubmit() {
        this.input.addEventListener('keyup', event => {
            event.preventDefault();
            if (event.keyCode === 13) {
                this.getDoctors(this.input.value).then(this.renderDoctors);
            }
        });
    }

    bindButtonSubmit() {
        this.button.addEventListener('click', event => {
            event.preventDefault();
            this.getDoctors(this.input.value).then(this.renderDoctors);
        });
    }

    renderDoctors(doctors) {
        this.payment = {};
        this.doctors = doctors;
        this.state = Object.assign({}, this.doctors.getSnapshot());
        this.render(this.main, this.state);
    }

    toggleDoctorPages(pageNum) {
        this.doctors.setPage(pageNum);
        this.renderDoctors(this.doctors);
    }

    getDoctorPayments(docID) {
        this.getPayments(docID).then(this.renderPayments);
    }

    renderPayments(payments) {
        
    }

    setStickyNav(formGroup) {
        const snap = formGroup.offsetTop;
        return () => {
            if (window.pageYOffset >= snap) {
                formGroup.classList.add("snap")
            } else {
                formGroup.classList.remove("snap");
            }
        };
    }
}

window.doctorPayments = new DoctorPayments({
    // If we're in the WCM, we want to append the content to the '.subsection_wrap' div
    wcmWrapper: document.querySelector('div.subsection_wrap'),
    formGroup: document.querySelector('div.form-group'),
    input: document.querySelector('input.search'),
    button: document.querySelector('button.search'),
    render,
    getDoctors,
    getPayments,
});
