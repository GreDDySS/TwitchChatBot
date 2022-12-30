import { createLogger, format, transports, addColors } from 'winston';
const { combine, colorize, timestamp, printf } = format;
import * as pc from "picocolors"


const LoggerLevels = {
    colors: {
        info: "green",
        error: "underline bold red",
        debug: "bold magenta",
        warn: "yellow",
    },
};

const logFormat = printf(({ level, message, timestamp}) => {
    return `${pc.magenta(timestamp)} [${level}]: ${message}`
});

const logger = createLogger({
    format: combine(
        format((info) => {
            info.level = info.level.toUpperCase();
            return info;
        })(),
        timestamp({
            format: 'DD.MM HH:mm',
        }),
        colorize(),
        logFormat
    ),
    transports: [
        new transports.Console({
            stderrLevels: ["error"],
        }),
    ],
});

addColors(LoggerLevels.colors);

logger.transports[0].level = "info";
logger.info(`${pc.green("[LOGGER]")} Setting log level to ${logger.transports[0].level}`);

const info = (message: string) => {
    logger.info(message);
};

const error = (message: string) => {
    logger.error(message);
};
const debug = (message: string) => {
    logger.debug(message);
};
const warn = (message: string) => {
    logger.warn(message);
};

export { info, error, debug, warn}