const { run } = require("./Started");

module.exports = {
    event: 'message',
    async run(client, message) {

        var prefix = client.prefix;
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()))
            return;

        var args = message.content.split(/ +/g);
        var cmd = args.shift().toLowerCase().slice(prefix.length);

        var command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if (!command) {
            message.reply(':x: | Ops! Esse comando não foi encontrado, tente novamente.')
                .then(msg => msg.delete({ timeout: 5000 }).catch(e => e))
                .catch(e => e);
        }
        else {
            command.run(client, message, args);
        }
    }
}
