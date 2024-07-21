const path = require('path');
const { markdownMagic } = require('markdown-magic');
const moment = require('moment-timezone');
const encodeurl = require('encodeurl');

const config = {
    matchWord: 'IVANCOTACTE',
    transforms: {
        async LAST_UPDATE() {
            const formattedDate = moment.tz('Asia/Manila').format("DD-MM-YYYY hh:mm A").replace(/-/g, '--') + ' (GMT+8)';
            const encodedDate = encodeurl(formattedDate);
            return `![last_update](https://img.shields.io/badge/last%20update-${encodedDate}-blue)`;
        },
    }
};

const markdownPath = path.join(__dirname, 'README.md');
markdownMagic(markdownPath, config, () => {
    console.log('Docs have been updated');
});