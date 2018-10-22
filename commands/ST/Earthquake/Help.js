const path = require("path");

// Own functions
const MsgFormat = require(path.join(process.cwd(), "functions", "MsgFormat.js"));
const CommandsList = require(path.join(process.cwd(), "functions", "CommandsList.js"));

module.exports = {
    description: '地震通知相關設定（約震後七分鐘通知）。',
    MessageHandler: function (event) {
        return new Promise(async function (resolve, reject) {
            resolve(MsgFormat.Text(await CommandsList.getCommands(event.message.originalText.replace('/', '').split(' '), !/^all$/i.test(event.message.text.replace(/\s/, '')), event.data.parents)));
        });
    }
};