const puppeteer = require('puppeteer');

const airbnb = {

    browser: null,
    page: null,

    intialize: async (url) => {
        airbnb.browser = await puppeteer.launch();
        airbnb.page = await airbnb.browser.newPage();
        await airbnb.page.goto(url, { waitUntil: 'networkidle2'});
    },

    /* Taking action on site cookies*/

    siteCookiesAction: async () => {
        await airbnb.page.evaluate(() => document.querySelector('.optanon-allow-all.accept-cookies-button').click());
    },

    /* scraing results */

    scrapeResults: async () => {

        let details = {};

        /* Selecting the title*/

        details.title = await airbnb.page.evaluate(() => document.querySelector("#summary h1 span").textContent);

        /*Selecting host details */

        let host_review = await airbnb.page.evaluate(() => document.querySelector('#host-profile h2 span').textContent);
        details.host_name = host_review.split(' ')[2];

        
        details.profile_img = await airbnb.page.evaluate(() => document.querySelector('#summary div a img').getAttribute('src'));
        details.user_profile_link = await airbnb.page.evaluate(() => document.querySelector('#summary div a img').parentNode.getAttribute('href'));

        /* Selecting the country and location */

        details.country = await airbnb.page.evaluate(() => document.querySelectorAll('#summary a')[0].textContent);
        details.location = await airbnb.page.evaluate(() =>document.querySelectorAll('#summary a')[1].textContent);

        return details;
    },

    /* Selecting details of the place */

    getListingDetails: async () => {

        let listing_details = {};

        await airbnb.page.evaluate(() => document.querySelector('#details button').click());
        listing_details.description = await airbnb.page.evaluate(() => document.querySelector("#details").textContent);
    
        await airbnb.page.evaluate(() => document.querySelector('#neighborhood button').click());
        listing_details.neighbourhood_details = await airbnb.page.evaluate(() => document.querySelector('#neighborhood').textContent);
        
        await airbnb.page.evaluate(() => document.querySelector('#house-rules button').click());
        listing_details.house_rules = await airbnb.page.evaluate(() => document.querySelector('#house-rules').textContent); 

        return listing_details;
    },

    /*Selecting images of the listing */

    getListingImages: async () => {

        const images = [];

        await airbnb.page.evaluate(() => document.querySelectorAll('#room button')[0].click());
        let slideshow_details = await airbnb.page.evaluate(() => document.querySelector('[data-veloute="slideshow-modal"] [dir="ltr"]').textContent);
        let split_text = slideshow_details.split(/[ /:]+/);
        let total_images = Number(split_text[1]);

        let i = 0;

        while (i < total_images) {
            let image = await airbnb.page.evaluate(() => document.querySelector('[data-veloute="slideshow-modal"] img').getAttribute('src'));
            images.push(image);
            await airbnb.page.evaluate(() => document.querySelector('[data-veloute="slideshow-modal"] [aria-label="Next"]').click());
            i++;
        }

        await airbnb.page.evaluate(() => document.querySelector('[data-veloute="slideshow-modal"] [aria-busy="false"]').click());

        return images;
    },

    /* Selecting amenities of the listing */

    getListingAmenities: async () => {
        airbnb.page.evaluate(() => document.querySelector('#amenities button').click());
        await airbnb.page.waitFor(2000);
        return amenities = await airbnb.page.evaluate(() => document.querySelector('[role="dialog"][aria-labelledby="dls-modal__AmenitiesModal"]').textContent);
    }
}

module.exports = airbnb;
