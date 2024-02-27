const axios = require('axios');
const config = require('./config.json');

/**
 * Get the member from the API
 * @param {String} userId The ID of the member
 * @returns {Promise<unknown | void>}
 */
async function getMember(userId) {
    const data = {
        url: `https://discord.com/api/users/${userId}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${config.botToken}`
        }
    };

    return axios(data)
        .then(req => req.data)
        .catch(e => console.log('Une erreur est survenue lors de la récupération du membre :' + e.message))
}

/**
 * Get the guild from the API
 * @param {String} guildId The ID of the guild
 * @returns {Promise<unknown | void>}
 */
async function getGuild(guildId) {
    const data = {
        url: `https://discord.com/api/guilds/${guildId}/preview`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${config.botToken}`
        }
    };

    return axios(data)
        .then(req => req.data)
        .catch(e => console.log('Une erreur est survenue lors de la récupération du membre :' + e.message))
}

module.exports = { getMember, getGuild };