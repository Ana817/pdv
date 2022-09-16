var { Utils } = require('../');
var config = require('../config/div.json');
var colors = require('colors');

module.exports = {
    async run(client, message, args) {
        if (args.length < 2) {
            return message.reply(`:clipboard: | Utilize **${client.prefix}div <id do servidor> <mensagem>** para iniciar a divulgação. '\n' para quebra de linha.`)
                .then(msg => msg.delete({ timeout: 8000 }).catch(e => e))
                .catch(e => e);
        }

        var guild = client.guilds.cache.get(args.shift());
        if (!guild) {
            return message.reply(`Nenhum servidor foi encontrado com o ID \`${args[0]}\`.`)
                .then(msg => msg.delete({ timeout: 7000 }).catch(e => e))
                .catch(e => e);
        }

        var members = guild.members.cache.filter(m => !m.user.bot && m.id != message.author.id && !m.hasPermission([ 'MANAGE_MESSAGES', 'MANAGE_MESSAGES' ])).array();
        if (!members.length) {
            return message.reply(`:x: | Ops! Até agora não consegui filtrar os membros. Aguarde um pouco, e envie algumas mensagens no chat.`)
                .then(msg => msg.delete({ timeout: 7000 }).catch(e => e))
                .catch(e => e);
        }

        message.reply(`:clipboard: | Divulgando para **${members.length}** membros - **${guild.name}**!`)
            //.then(msg => msg.delete({ timeout: 8000 }).catch(e => e))
            .catch(e => e);

        var msg = args.join(' ');

        var success = 0, total = 0;
        while (total < members.length) {
            total++;
            let member = members[total];
            if (!member) continue;

            await member.send(msg).then(() => {
                console.log(`[ENVIADA] ${colors.yellow.bold(member.displayName)} recebeu a mensagem - ${colors.yellow.bold(guild.name)}. ${colors.cyan(`(${members.length - total} restantes)`)}`);
            }).catch(() => {
                console.log(colors.red(`[FALHA] ${colors.white.bold(member.displayName)} não recebeu a mensagem - ${colors.white.bold(guild.name)}. ${colors.cyan(`(${members.length - total} restantes)`)}`));
            });

            let userChannel = member.user.dmChannel;
            if (userChannel) {
                await userChannel.delete()
                    .catch(e => e);
            }

            await Utils.sleep(config.cooldown * 1000);
            members = guild.members.cache.filter(m => !m.user.bot && m.id != message.author.id && !m.hasPermission('ADMINISTRATOR')).array();
        }

        message.reply(`:clipboard: | **${success}** receberam a mensagem - **${members.length}** tentativas.`)
            .then(msg => msg.delete({ timeout: 60000 }).catch(e => e))
            .catch(e => e);
    },

    name: 'div',
    aliases: [ 'divulgar' ]
}
