/**
 * This example demonstrates setting up webhook
 * on the Heroku platform.
 */

require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
const TOKEN = process.env.TOKEN
const TelegramBot = require('node-telegram-bot-api');
const options = {
    webHook: {
        // Port to which you should bind is assigned to $PORT variable
        // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
        port: process.env.PORT
        // you do NOT need to set up certificates since Heroku provides
        // the SSL certs already (https://<app-name>.herokuapp.com)
        // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
    }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.HEROKU_URL
let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(TOKEN, options);
    // This informs the Telegram servers of the new webhook.
    // Note: we do not need to pass in the cert, as it already provided
    bot.setWebHook(`${url}/bot${TOKEN}`);
} else {
    // Create a bot that uses 'polling' to fetch new updates
    bot = new TelegramBot(TOKEN, { polling: true });
}

bot.on('message', (msg) => {
    var hi = 'hi'
    if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
        bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name + ", DailyMuslim siap menemani hari-harimu");
    }

    var bye = 'bye'
    if (msg.text.toString().toLowerCase().indexOf(bye) === 0) {
        bot.sendMessage(msg.chat.id, "Sampai jumpa kembali")
    }

    var html = 'html'
    if (msg.text.toString().toLowerCase().indexOf(html) === 0) {
        bot.sendMessage(msg.chat.id, "<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>", { parse_mode: "HTML" });
    }

    var markdown = 'markdown'
    if (msg.text.toString().toLowerCase().indexOf(markdown) === 0) {
        bot.sendMessage(msg.chat.id, "*bold text* _italic text_  [text](http://www.example.com/)  `inline fixed-width code`", { parse_mode: "MARKDOWN" });
    }

    var location = "location";
    if (msg.text.indexOf(location) === 0) {
        bot.sendLocation(msg.chat.id, 44.97108, -104.27719);
        bot.sendMessage(msg.chat.id, "Here is the point");

    }

    var location = "venue";
    if (msg.text.indexOf(location) === 0) {
        bot.sendVenue(msg.chat.id,
            -6.8932055, 107.6107351,
            'Institut Teknologi Bandung',
            'Jl. Ganesha No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132')
    }

    var contact = "contact";
    if (msg.text.indexOf(contact) === 0) {
        bot.sendContact(msg.chat.id, '085728341252', 'Fajar Muslim')
    }
})

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["Sample text", "Second sample"], ["Keyboard"], ["I'm robot"]]
        }
    });

});

bot.onText(/\/sendpic/, (msg) => {

    bot.sendPhoto(msg.chat.id, "https://pbs.twimg.com/profile_images/836603072205856769/QtRFv6Jw_400x400.jpg", { caption: "Here we go ! \nThis is just a caption " });

});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});