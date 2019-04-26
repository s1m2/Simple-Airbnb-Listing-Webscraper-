const airbnb = require('./scraper');
const BASE_URL = "https://www.airbnb.co.uk/rooms/834190?guests=1&adults=1";

const getResults = async () => {
    try {
        await airbnb.intialize(BASE_URL);
        await airbnb.siteCookiesAction();

        let listing_details = await airbnb.scrapeResults();
        listing_details.listing_url = BASE_URL;
        listing_details.images = await airbnb.getListingImages();
        listing_details.amenities = await airbnb.getListingAmenities();

        return final_listing_detials = Object.assign(listing_details, await airbnb.getListingDetails());

    } catch (error) {
        throw Error(error);
    }
};

module.exports = getResults;