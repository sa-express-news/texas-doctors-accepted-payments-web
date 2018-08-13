// import main landing page template
import landingPage from '../templates/landing-page.hbs';

export default (el, data) => {
    el.innerHTML = landingPage(data);
};
