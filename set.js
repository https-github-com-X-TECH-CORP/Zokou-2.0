const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUNzWDRFMTE3eTViakJxKzQ0a3g4cXhZdndieHZDZDN2YWRRajArdFlFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1dCcGxCSHBYVG1rZEtFOTkvR0dTdW4wZEhtWU5vWGdQZUM3c1Rja21odz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQnRCaFpsYUdnYUEvMjNEY252aStOS0J1NHNGQzdaRWUrWUtmdDJlRVhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLcVJvZU9QaTZheEQ2aHNsWFVpYngxSWl4WWtkaHlQSU5rVHB1dVdFUGpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBQZjlwcTQ3RVIvV2Z5bWQzSnAveXFsSFljcGJWMENKR0llUDd5a2ZnVjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imx0Q29ROGJwTkN1UC8wbjZ2QmFESWdtVFFTR0ZURENxYUQxbW0zYWcwelk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdIMHp6c3JyU0ordm9Iam85MU9DWkwvR3Y2VUVFUm56QzNWSjNDemhVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2FXM25JM2VHZnBlR0g3VWhzWVhXa3A1ckhGUDF6SlFlcGM2Rk5sbmttcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldiOVNBNDlyZlBOVzQ3VHZHdzlFRmtSVjB4U3prOEh3UFhreEdKd1ZLSzZmenZTUEY0dTN2cWZrS3V4YVJxTkNURk9mc0o4YzhoZTZsVGxjTkNtOGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY4LCJhZHZTZWNyZXRLZXkiOiIwdFVmS0dGMURabjhUcTVpVUlyVzE2ZFA4QTJuWHJOckN5NlkzTFZoU01FPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHQXlqLTNkX1JpQ3F1Mk9TYXY5bmd3IiwicGhvbmVJZCI6IjU4MDA5ZmRjLTk3ODUtNGU3Yy04N2M1LTE3MjY0MzE3OTgxNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Y0cxZjhOQzN6ekZiWk1TQzk5TVhNM1U0ejA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkdkd3VjbmRGVGVHMVkwVCthSHVneEwxOUhRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFGUVdQNlNRIiwibGFzdFByb3BIYXNoIjoiM0E4ckZnIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQ0E9PSJ9LCJtZSI6eyJpZCI6IjI0MjA2NzI3NDY2MDoxM0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE4NDgxNzIyNDMxMDgwNzoxM0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pYUGx0RUdFS3Y2NDdZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IllkVDlweXpqaFRLTVBWcHBjOE5FamdiK3FJUHlSZEpFME4zc0NFdTJUMnc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik9VT1hrVWszVWJiZUN3bHU4WjVSclU2WXNpdFY2alp6RXAwaVN1cURkTGdmaWF6Q1BnRzhpSGpKK0xxd2FzcEJwYWZkMzdMMGlmUVFKZDRGcGVXTUFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJPdEpBdUJ4WGVwNHhiZlJRSkIzMDRIdlloeEZPS3lFVTN2cUlBcFJNZVh3cHRzWlFTcDkvSVBBc2JWSk9oVEk5MEc3NHBQZHlFMmEvWVVsdkhydG5nQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI0MjA2NzI3NDY2MDoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXSFUvYWNzNDRVeWpEMWFhWFBEUkk0Ry9xaUQ4a1hTUk5EZDdBaEx0azlzIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1NDk2NjIyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhCRCJ9',
     ETAT:process.env.ETAT,
                  
    PREFIXE: process.env.PREFIXE,.
    NOM_OWNER: process.env.NOM_OWNER || "AKASHI SAQAT",
    NUMERO_OWNER : process.env.NUMERO_OWNER,  242067274660            
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,non
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'CIBERSAXTRON',
    URL : process.env.LIENS_MENU || 'https://telegra.ph/file/c10dc5b53c22043607f81.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
