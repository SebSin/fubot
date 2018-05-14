const TelegramBot = require('node-telegram-bot-api');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request'), zlib = require('zlib');

// replace the value below with the Telegram token you receive from @BotFather
const token = '504523582:AAHol_PCbHX0xUdjhFI02PEHrJnjvmgDRJg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://www.apple.com/hk/shop/delivery-message?parts.0=MPQV2ZP%2FA&parts.1=MPR52ZP%2FA", false); // false for synchronous request
    xmlHttp.send(null);
    var responseText = xmlHttp.responseText;

// send back the matched "whatever" to the chat
    bot.sendMessage(chatId, responseText);
})
;

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

// send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, '收到');
})
;

function getRankingList() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://act.futunn.com/easter/ranking-list?location=hk", false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var timer;

bot.onText(/\/startpoll/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    var oldResponseText = "";

    function getRankingList() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://act.futunn.com/easter/ranking-list?location=hk", false); // false for synchronous request
        xmlHttp.send(null);

        var responseText = xmlHttp.responseText;
        var message = '';
        if (oldResponseText != responseText) {
            var response = JSON.parse(responseText);
            var rankingList = response.data.list;


            for (let i in rankingList) {
                var ranking = rankingList[i];
                var rank = parseInt(i) + 1;
                message += rank + ": [" + ranking.score + "] " + ranking.nick + "\n"
            }
            bot.sendMessage(chatId, message);
            oldResponseText = responseText;
        }
        // else {
        //     bot.sendMessage(chatId, "loop");
        // }
    }

    clearInterval(timer);
    timer = setInterval(getRankingList, 600000);

})
;

bot.onText(/\/stoppoll/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"


    clearInterval(timer);
    bot.sendMessage(chatId, "Stopped Polling.");

})
;

bot.onText(/\/getrank/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"


    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://act.futunn.com/easter/ranking-list?location=hk", false); // false for synchronous request
    xmlHttp.send(null);

    var responseText = xmlHttp.responseText;

    var response = JSON.parse(responseText);
    var rankingList = response.data.list;

    var message = '';
    for (i in rankingList) {
        var ranking = rankingList[i];
        var rank = parseInt(i) + 1;
        message += rank + ": [" + ranking.score + "] " + ranking.nick + "\n"
    }

    bot.sendMessage(chatId, message);
// send back the matched "whatever" to the chat

})
;

bot.onText(/\/hi/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"


    async function f() {
        return await getBody();
    }
    async.waterfall([
        function (callback) {
            request.post({
                url: 'https://stockcharts.com/login/index.php',
                form: 'form_Name=Login&redirect=&form_UserID=mhsin.seb%40gmail.com&form_UserPassword=fantszching'
            }, function (error, response, body) {

                callback(null, response);
            });
            //callback(null, 'one');
        },
        function (arg1, callback) {
            request.get({
                url: 'https://stockcharts.com/j-sum/sum?cmd=sctr&view=L&timeframe=W',
                gzip: true
            }, function (error, response, body) {
                // console.log(body);
                callback(null, body);
            });
            // arg1 now equals 'one' and arg2 now equals 'two'
            //callback(null, 'three');
        }
    ], function (err, result) {

        console.log(err);
        console.log(result);
        bot.sendMessage(chatId, result);
    });



// send back the matched "whatever" to the chat

})
;