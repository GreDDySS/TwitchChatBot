import { TwitchClient } from "./clients/twitch";

interface Bot {
    Config?: botConfig,
    Twitch?: TwitchClient,
    Logger?: botLogger,
    Temp?: botTemp,
}

type botConfig = {
    username: string,
    password: string,
    bearer: string,
    clientId: string,
    token: string,
    prefix: string,
    owner: string,
    botId: number,
    db_user: string,
    db_pass: string,
    db_ip: string,
    db_db: string,
}

type botTemp = {
    cmdCount: number
}

type botLogger = {
    info: (message: string) => void,
    error: (message: string) => void,
    warn: (message: string) => void,
    debug: (message: string) => void,
}