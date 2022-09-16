module.exports = {
    async run(client, message, args)
    {
        if (!args.length)
        {
            return message.reply(`Use **${client.prefix}entrar <id do servidor>** para entrar em um servidor.`)
                .then(msg => msg.delete({ timeout: 8000 }).catch(e => e))
                .catch(e => e);
        }

        let code = args.join('');
        if (code.length < 2)
        {
            return message.reply(`ID inválido.`)
                .then(msg => msg.delete({ timeout: 5000 }).catch(e => e))
                .catch(e => e);
        }

        let response = await client.api_.request(`invites/${code}`, {
            method: 'POST'
        })
            .then(res => res)
            .catch(() => false);

        if (!response)
        {
            return message.reply(`ID inválido.`)
                .then(msg => msg.delete({ timeout: 5000 }).catch(e => e))
                .catch(e => e);
        }

        message.reply(`Sucesso! Acabo de entrar no servidor **${response.guild.name}** usando o ID \`${code}\`.`)
            .then(msg => msg.delete({ timeout: 10000 }).catch(e => e))
            .catch(e => e);
    },

    name: 'entrar',
    aliases: [ 'join' ]
}