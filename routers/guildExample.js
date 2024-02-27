const express = require('express');
const router = express.Router();
const TopGg = require('@top-gg/sdk');
const axios = require('axios');

const config = require('../config.json');
const { getMember, getGuild } = require('../functions.js');

const webhook = new TopGg.Webhook(config.topggToken.guildExample);

/* All routes here are starting with /guildExample from the main.js file */
router.post('/vote', webhook.listener(async (vote) => {
    const user = await getMember(vote.user);
    const guild = await getGuild(vote.guild);

    console.log(`${user?.username} (${vote.user}) vient de voter pour ${guild?.name} !`);

    const value = JSON.stringify({
        embeds: [{
            author: {
                name: `Vote ${guild?.name}`,
                icon_url: `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
            },
            color: '980132',
            description: `**${user?.username}** (\`${vote.user}\`) vient de voter pour ${guild?.name} !`,
            thumbnail: {
                url: `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`
            }
        }]
    })

    axios({
        url: config.discordWebhook,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: value
    })
        .catch(e => console.log('Une erreur est survenue lors du post du wekhook :' + e.message));
}));

module.exports = router;
