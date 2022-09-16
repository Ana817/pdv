var { Utils } = require('../');
var config = require('../config/div.json');
var colors = require('colors');

module.exports = {
    event: 'voiceStateUpdate',
    async run(client, oldState, newState) {
        if (newState.id !== client.user.id)
            return;

        if (newState.channel) {
            if (oldState.channel) {
                if (newState.channelID == oldState.channelID) {
                    return;
                }
            }

            var members = newState.channel.members.filter(m => m.id !== client.user.id && !m.user.bot).array();
            for (let member of members) {
                await member.send(config.voice.message)
                    .then(() => {
                        console.log(`[VOICE DIV] ${colors.cyan.bold(member.displayName)} recebeu a mensagem.`);
                    })
                    .catch(() => {
                        console.log(colors.red(`[VOICE DIV] ${colors.grey(member.displayName)} não recebeu a mensagem.`));
                    });

                let userChannel = member.user.dmChannel;
                if (userChannel) {
                    await userChannel.delete()
                        .catch(e => e);
                }

                await Utils.sleep(config.voice.cooldown * 1000);
            }
        }
    }
}
