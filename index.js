const path = require('path');
const { markdownMagic } = require('markdown-magic');
const moment = require('moment-timezone');
const encodeurl = require('encodeurl');
const axios = require('axios');
const fs = require('fs');
const request = require('request');

const config = {
    matchWord: 'IVANCOTACTE',
    transforms: {
        async LAST_UPDATE() {
            const formattedDate = moment.tz('Asia/Manila').format("DD-MM-YYYY hh:mm A").replace(/-/g, '--') + ' (GMT+8)';
            const encodedDate = encodeurl(formattedDate);
            return `\n<img align="right" src="https://img.shields.io/badge/last%20update-${encodedDate}-blue" />\n`;
        },
    }
};

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
    } catch (error) {
        let errorMessage = "Error: " + error;
        return errorMessage;
    }
}

getShotiAPi();


const markdownPath = path.join(__dirname, 'README.md');
markdownMagic(markdownPath, config, () => {
    console.log('Docs have been updated');
});
