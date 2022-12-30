import { AlternateMessageModifier, SlowModeRateLimiter, ChatClient, LoginError, JoinError, SayError, PrivmsgMessage} from "@kararty/dank-twitch-irc"
import * as pc from "picocolors"
import * as dotenv from "dotenv"
import { TBot } from ".."
import { botConfig } from "../types"

dotenv.config({path: ".env"})

class TwitchClient extends ChatClient{
    initialize: () => Promise<void>
}

const config: botConfig = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    bearer: process.env.BEARER,
    clientId: process.env.CLIENT_ID,
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    owner: process.env.OWNER,
    botId: Number(process.env.BOTID),
    db_user: process.env.DB_USERNAME,
    db_pass: process.env.DB_PASSWORD,
    db_ip: process.env.DB_IP,
    db_db: process.env.DB_DATABASE,
}

const client = new TwitchClient({
    username: config.username,
    password: config.password,
    rateLimits: "default",
});

client.use(new AlternateMessageModifier(client))
client.use(new SlowModeRateLimiter(client, 10))

client.initialize = async () => {
    await client.joinAll(["greddyss", "ilotterytea"])
    client.connect()
}

client.on("ready", async () => {
    TBot.Logger.info(`${pc.green("[CONNECTED]")} || Connected to Twitch 🟢`)
    await client.say("greddyss", "GreDDBot")
    await client.say("ilotterytea", "BrorStirrer")
})

client.on("error", (error) => {
    if (error instanceof LoginError){
        return TBot.Logger.error(`${pc.red("[LOGIN]")} || Error logging in to Twitch: ${error}`)
    }
    if (error instanceof SayError){
        return TBot.Logger.error(`${pc.red("[SAY]")} || Error sanding message in: ${error.failedChannelName} : ${error.cause} | ${error.message}`)
    }
    if (error instanceof JoinError){
        return TBot.Logger.error(`${pc.red("[JOIN]")} || Error joining channel: ${error.failedChannelName} : ${error}`)
    }

    
})

export { client, config, TwitchClient }