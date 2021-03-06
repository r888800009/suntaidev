const path = require("path");

// Own functions
const MsgFormat = require(path.join(process.cwd(), "functions", "MsgFormat.js"));

module.exports = {
    description: "Changelog.",
    MessageHandler: function (event) {
        return new Promise((resolve, reject) => {
            let msgs = event.message.text.split(' ');
            if (msgs[1] && msgs[1].toLowerCase() == 'lastest') {
                resolve(MsgFormat.Text(changelog.lastest + ': ' + changelog[changelog.lastest]));
            } else if (msgs[1] && msgs[1].toLowerCase() == 'all') {
                let response = '';
                for (let key in changelog) {
                    response += key + ': ' + changelog[key];
                }
                resolve(MsgFormat.Text(response));
            } else if (msgs[1] && changelog[msgs[1]]) {
                resolve(MsgFormat.Text(changelog[msgs[1]]));
            } else {
                reject(MsgFormat.Text('Error: 沒有這個版本號。'));
            }
        });
    }
};

const changelog = {
    "lastest": "1.0.2",
    "1.0.0": "基本功能與文件定義發布",
    "1.0.1": "自訂資料夾預設指令、訊息量與巴哈姆特看板排名、訊息過長自動分割，加回地震通知、Imgur上傳、訊息紀錄，翻新地震地區調整功能、動漫電玩通訊息。",
    "1.0.2": "DataBase 功能新增創建 Table 跟檢查 Table 是否存在、新增關鍵字回應、Pastebin 上傳，並將過長切割功能放入 MsgFormat 功能中。"
};