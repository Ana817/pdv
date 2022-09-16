var colors = require('colors');

module.exports = {
    event: 'ready',
    async run(client) {
        console.clear();
        console.log(`

          youtube.com/nickoscript
          888b     d888  .d8888b.   .d8888b. 88888888888
          8888b   d8888 d88P  Y88b d88P  Y88b    888
          88888b.d88888 Y88b.      888    888    888
          888Y88888P888  "Y888b.   888           888   .d88b.  888d888
          888 Y888P 888     "Y88b. 888  88888    888  d88""88b 888P"
          888  Y8P  888       "888 888    888    888  888  888 888
          888   "   888 Y88b  d88P Y88b  d88P    888  Y88..88P 888
          888       888  "Y8888P"   "Y8888P88    888   "Y88P"  888


              Conectado na conta: ${client.user.tag}

          Digite: .div em algum servidor privado para obter ajuda.`);
    }
}
