// Own functions
const MsgFormat = require('../../../functions/MsgFormat.js');
const DataBase = require('../../../functions/DataBase.js');
const Authorize = require('../../../functions/Authorize.js');

module.exports = {
    description: '新增關鍵字回應，指令格式：<keyword> -method <FullCompare(完全符合)|PartCompare(部分符合))> -response <response>，可以使用正則，如使用正則需選擇 PartCompare。',
    MessageHandler: function (event) {
        return new Promise(async function (resolve, reject) {
            var keyword = event.message.text.match(/([\s\S]*?) -method (FullCompare|PartCompare) -response ([\s\S]*)/);
            var dataType = "text";
            if (keyword.length != 4) reject('輸入錯誤！指令格式：<keyword> -method <FullCompare(完全符合)|PartCompare(部分符合))> -response <response>，例如：1 2 3 -method FullCompare -response 4-5-6');
            if (/^\(function[\s\S]*?\([\s\S]*?\)[\s\S]*?\{[\s\S]*?\}[\s\S]*\)\([\s\S]*\)$/.test(keyword[3])) {
                if (await Authorize.Owner(event.source.userId)) dataType = "function";
            }
            DataBase.readTable('Keyword').then(keywordList => {
                DataBase.insertValue('Keyword', [event.source.userId, keywordList.length, keyword[2], keyword[1], dataType, keyword[3]]).then(() => {
                    resolve(MsgFormat.Text("已經設定好以下回應：\n{\n  id: " + keywordList.length + ",\n  method: " + keyword[2] + ",\n  keyword: " + keyword[1] + ",\n  dataType: " + dataType + ",\n  data: " + keyword[3] + "\n}"));
                }, reject);
            }, reject);
        });
    }
};