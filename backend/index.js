/*
 * - Setup an express server (include all your standard requires such as bodyParser)
 * - Listening on port 3001
 * - Route should start with '/api'
 * - Setup route
 *  1. GET '/api/retrieve-sales' 
 *      - This will retrieve the data from attached 'sample_data.JSON'
 *      - After retrieving the data, change values for 'status' to the below
 *            0 = 'In Stock'
 *            1 = 'Out of Stock'
 *            2 = 'Custom'
 *            3 = 'On Hold'
 *            4 = 'Superceded'
 *            5 = 'Low Stock'
 */

/*
    name: Daniel Son.
    date: 22/06/2021.
    purpose: Coding challenge from Streamline. 

    This is the backend. The sample_data.json is in the ./data folder. 
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const BASE_URL = '/api';
const PORT_NUMBER = 3001;
const app = express();

app.use(express.urlencoded({
    extended: true
})); // Be able to parse req.body.
app.use(cors()); // Allow us to communicate with our locally-run frontend.
app.use(bodyParser.json()); // Allow us to process incoming request bodies.

app.get(BASE_URL, (req, res) => {
    res.send("Welcome Home.");
});

const getData = () => {
    const getDecodedDataStatus = data => {
        const decodeStatus = status => {
            let meaning;

            switch (status) {
                case 0:
                    meaning = 'In Stock';
                    break;
                case 1:
                    meaning = 'Out of Stock';
                    break;
                case 2:
                    meaning = 'Custom';
                    break;
                case 3:
                    meaning = 'On Hold';
                    break;
                case 4:
                    meaning = 'Superceded';
                    break;
                case 5:
                    meaning = 'Low Stock';
                    break;
            };
            
            return meaning;
        }

        data.forEach((d, i) => {
            data[i].status = decodeStatus(d.status);
        });

        return data;
    };

    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/data/sample_data.json', 'utf8', (err, data) => {
            if (err) return reject(err);

            if (data) {
                data = JSON.parse(data); // Change JSON string to object, to manipulate it below. 
                data = getDecodedDataStatus(data);
            }
            return resolve(data);
        });
    });
}

app.get(`${BASE_URL}/retrieve-sales`, async (req, res) => {
    const data = await getData();
    res.send(data);
});

app.get('*', (req, res) => {
    res.send("The page you're looking for does not exist. Please recheck the URL.");
});

app.listen(PORT_NUMBER, () => {
    console.log(`Backend running on port ${PORT_NUMBER}!`);
});