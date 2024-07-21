const axios = require('axios');
const request = require('request');
const fs = require('fs');
const gifify = require('gifify');
const path = require('path');

async function getShotiAPi() {
    const apiUrl = "https://shoti-srv2.onlitegix.com/api/v1/get";

    try {
        const response = await axios.post(apiUrl, {
            apikey: "$shoti-1hfq7q51ea5igcrf4t8"
        });

        const videoUrl = response.data.data.url;
        await new Promise((resolve, reject) => {
            request(videoUrl)
                .pipe(fs.createWriteStream('cache/video.mp4'))
                .on('finish', () => {
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        }); 

        var input = path.join(__dirname, 'cache/video.mp4');
        var output = path.join(__dirname, 'cache/video.gif');

        var gif = fs.createWriteStream(output);

        var options = {
            resize: '200:-1',
            from: 30,
            to: 35
        };

        gifify(input, options).pipe(gif);
    } catch (error) {
        console.log("Error: " + error);
    }
}

getShotiAPi();