import  express from "express";
import got from 'got';
const router = express.Router();
import * as data from '../worldfacts.js'


router.get('/', async (req, res) => {
    // Transform the countries object into an array of continents, each with its countries
    const continentsWithCountries = Object.entries(data.countries).map(([continentKey, countries]) => {
        return {
            name: continentKey,
            countries: Object.keys(countries) // Grab only the country names
        };
    });

    // Pass this structured data to the view
    res.render('cia-profile', { continentsWithCountries: continentsWithCountries });
});

// Define the country route with parameters for the region and country
router.get("/:region/:country", async (req, res) => {
    const { region, country } = req.params;
    console.log(region,country)
    
    try {
        // Construct the URL for the specific country
        const {countries} = data
        const countryUrl = countries[region][country].url;

        // Fetch country data from the provided URL
        const response = await got.get(countryUrl).json();
        const countryData = response;

        // Send the country data back as a response
        res.render('country-detail', { countryData: countryData });
        
    } catch (error) {
        // Handle errors
        console.error('Error fetching country data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
