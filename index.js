const path = require('path');
const { markdownMagic } = require('markdown-magic');
const moment = require('moment-timezone');
const encodeurl = require('encodeurl');
const axios = require('axios');

String.prototype.replaceAll = function(strReplace, strWith) {
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

const config = {
    matchWord: 'IVANCOTACTE',
    transforms: {
        async LAST_UPDATE() {
            const formattedDate = moment.tz('Asia/Manila').format("DD-MM-YYYY hh:mm A").replace(/-/g, '--') + ' (GMT+8)';
            const encodedDate = encodeurl(formattedDate);
            return `\n<img align="right" src="https://img.shields.io/badge/last%20update-${encodedDate}-blue" />\n`;
        },
        async QUOTES() {
            const qoute = await qt();
            return `\n<h3>${qoute.q}</h3>\n`;
        }
    }
};

async function qt() {
    let qoute = await axios
        .get("https://zenquotes.io/api/random")
        .then((response) => {
            return response.data[0];
        })
        .catch((err) => {
            return "err ";
        });
    return qoute;
}


const markdownPath = path.join(__dirname, 'README.md');
markdownMagic(markdownPath, config, () => {
    console.log('Docs have been updated');
});
