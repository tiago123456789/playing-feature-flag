require("dotenv").config()

const configcat = require("configcat-node");


const logger = configcat.createConsoleLogger(configcat.LogLevel.Info); 

const userObject = new configcat.User(
    null,
    null,
    null,
    {
        role: "ADMIN"
    }
);

const configCatClient = configcat.getClient(process.env.CONFIGKAT_KEY,
    configcat.PollingMode.AutoPoll,
    {
        logger: logger
    });

console.log("passed on here")

async function start() {
    const isCountFrom1To10 = await configCatClient.getAllValuesAsync("isCountFrom1To10", false, userObject)
    const isPrintConsoleLog = await configCatClient.getValueAsync("isPrintConsoleLog", false, userObject);

    if (isPrintConsoleLog) {
        console.log("Feature flag enabled to print message using console.log")
    }

    if (isCountFrom1To10) {
        for (let index = 1; index <= 10; index += 1) {
            console.log("Index =>", index)
        }
    }
    
}

start()