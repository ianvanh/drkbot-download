import {
    WAConnection
} from '@adiwajshing/baileys';
import * as fs from 'fs';
import { run } from './console.js';
import * as Hx from '../handler.js';
import { Setting } from './setting.js';
import Chalk from 'chalk';
let { Function } = new Setting()

export let dbot = new WAConnection()

export const starts = async (json) => {
    dbot.logger.level = 'warn'
    dbot.version = [2, 2123, 8]
    dbot.browserDescription = [ 'DrkBot', 'Chrome', '3.0' ]
    dbot.on('qr', () => {
        console.log(Chalk.redBright('Todo Bien'))
    })
    fs.existsSync(json) && dbot.loadAuthInfo(json)
    run('DrkBot|Download')
    dbot.on('Espere...', () => {
        console.info((Chalk.greenBright('Espere...')))
    })
    dbot.on('open', () => {
        console.info(Chalk.greenBright('Conectado.'))
    })
    await dbot.connect({timeoutMs: 30*1000})
        fs.writeFileSync(json, JSON.stringify(dbot.base64EncodedAuthInfo(), null, '\t'))

    dbot.on('chat-update', async (m) => {
        if (!m.hasNewMessage) return
        m = m.messages.all()[0]
        if (!m.message) return
        if (m.key.fromMe) return
        if (m.key.remoteJid == 'status@broadcast') return  
        m = await Function(m)
        let prefix = /[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©]/.test(m.chats) ? m.chats.match(/[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©]/) : ''
        Hx.dbot(dbot, m, prefix)
    })
}
