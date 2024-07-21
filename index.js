import got from 'got';

let config = {
    stars_repo : (process.env.REPO)?process.env.REPO:'ivancotacte/ivancotacte'
};

String.prototype.replaceAll = function(strReplace, strWith) {
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

let get_users = async function() {
    let thanks_to = [];
    let stars = await got('https://api.github.com/repos/'+config.stars_repo+'/stargazers').json();
    for (let user of stars) {
        thanks_to.push({ 
            name:user.login,
            ithub:user.html_url,
            avatar:user.avatar_url 
        });
    }
    return thanks_to;
};