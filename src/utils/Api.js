var fetch = require('node-fetch');

class Api {
    constructor(client) {
        this.client = client;
    }

    request(path, options = {}) {
        var query = '';
        if (options.query) {
            query = `?${options.query}`;
        }

        if (options.body) {
            options.body = JSON.stringify(options.body);
        }

        path = `https://discord.com/api/v8/${path}${query}`;
        options = {
            method: 'GET',
            ...options,
            headers: {
                Authorization: this.client.token,
                'Content-Type': 'application/json'
            }
        }

        return fetch(path, options)
            .then(res => res.json())
            .catch(e => e);
    }
}

module.exports = Api;
