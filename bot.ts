import * as pc from "picocolors"
import * as utils from "util"
import { Bot } from "./types"
import { client, config } from "./clients"
import { info, debug, warn, error } from "./modules/winstone"

const TBot: Bot = {}


TBot.Config = config
TBot.Logger = {
    info: info,
    warn: warn,
    error: error,
    debug: debug
}

TBot.Twitch = client
TBot.Temp = {cmdCount: 1}

// initializing
async function start() {
    try {
        await TBot.Twitch.initialize()
    } catch (e) {
        TBot.Logger.error(`Error encountered during initialization: ${e}`)
    }
}
start()

process
.on('unhandledRejection', async (reason, promise) => {
    return TBot.Logger.error(`${pc.red('[UnhandledRejection]')} || ${utils.inspect(promise)} ${reason}`);
})
.on('uncaughtException', async (err) => {
    TBot.Logger.error(`${pc.red('[UncaughtException]')} || ${err.message}`);
    return process.exit(0);
});

export { TBot }