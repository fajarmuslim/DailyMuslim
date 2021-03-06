/**
 * This example demonstrates setting up webhook
 * on the Heroku platform.
 */
const prayerTime = require('./prayer_time')
const fastingTime = require('./fasting_time')
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image')

require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
const TOKEN = process.env.TOKEN
const TelegramBot = require('node-telegram-bot-api');
const options = {
    webHook: {
        port: process.env.PORT
    }
};

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

bot.on("polling_error", console.log);


bot.on('message', (msg) => {
    var stringMsg = msg.text.toString().toLowerCase()
    if (stringMsg.indexOf('hi') === 0) {
        bot.sendMessage(msg.from.id, 'id: ' + msg.from.id);
        bot.sendMessage(msg.from.id, 'username: ' + msg.from.username);
        bot.sendMessage(msg.from.id, 'first name: ' + msg.from.first_name);
        bot.sendMessage(msg.from.id, 'last name:' + msg.from.last_name);
        bot.sendMessage(msg.from.id, 'is bot: ' + msg.from.is_bot);
        bot.sendMessage(msg.from.id, 'language code: ' + msg.from.language_code);

        // bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name + ", DailyMuslim siap menemani hari-harimu");
    } else if (stringMsg.indexOf('help') === 0) {
        bot.sendMessage(msg.chat.id, "Silahkan pilih menu pada keyboard", {
            "reply_markup": {
                "keyboard": [["Jadwal Sholat"], ["Jadwal Puasa"], ["Al-Quran"]],
                "one_time_keyboard": true
            }
        });
    } else if (stringMsg.indexOf('jadwal sholat') === 0) {
        bot.sendMessage(msg.chat.id, "Perintah: sholat [nama_kota] \n \n Contoh: sholat boyolali");
    } else if (stringMsg.startsWith('sholat')) {
        var arrMsg = stringMsg.split(" ")
        const city_name = arrMsg[1]
        try {
            const getPrayerTimeCall = async () => {
                const prayerTimesRes = await prayerTime.getPrayerTimeCity(city_name)
                const prayerTimesParsed = JSON.parse(JSON.stringify(prayerTimesRes.data.jadwal.data))

                var htmlfile = prayerTimesParsed.tanggal + "\n" + "===================\n" + "imsak      : " + prayerTimesParsed.imsak + "\n" + "subuh      : " + prayerTimesParsed.subuh + "\n" + "dhuha      : " + prayerTimesParsed.dhuha + "\n" + "dzuhur     : " + prayerTimesParsed.dzuhur + "\n" + "ashar       : " + prayerTimesParsed.ashar + "\n" + "maghrib  : " + prayerTimesParsed.maghrib + "\n" + "isya          : " + prayerTimesParsed.isya + "\n"
                bot.sendMessage(msg.chat.id, htmlfile, { parse_mode: "HTML" });
                // bot.sendMessage(msg.chat.id, JSON.stringify(prayerTimeRes.data.jadwal.data))
            }
            getPrayerTimeCall()
        } catch (error) {
            console.error(error)
        }
    } else if (stringMsg.indexOf('jadwal puasa') === 0) {
        bot.sendMessage(msg.chat.id, "Perintah: puasa [nama_bulan] \n \n Contoh: puasa januari");
    } else if (stringMsg.startsWith('puasa')) {
        var arrMsg = stringMsg.split(" ")
        const city_name = arrMsg[1]
        try {
            const getFastingCal = async () => {
                const fastingCalendar = await fastingTime.getFastingCalendar(city_name)
                // for (var key of Object.fastingCalendar) {
                //     console.log(key + "->" + fastingCalendar[key]);
                // }

                console.log(fastingCalendar);
                for (var key in fastingCalendar) {
                    if (fastingCalendar.hasOwnProperty(key)) {
                        console.log(key + "->" + fastingCalendar[key]);
                    }
                    console.log("punten");
                    fastingCalendar[key].forEach(element => {
                        console.log(element);
                    });
                    console.log("punten");
                }
                bot.sendMessage(msg.chat.id, JSON.stringify(fastingCalendar));
            }
            getFastingCal()
        } catch (error) {
            console.error(error)
        }
    }

    else {
        bot.sendMessage(msg.from.id, 'Perintah yang anda masukkan tidak tersedia dalam sistem kami');
        bot.sendMessage(msg.chat.id, "Silahkan pilih menu pada keyboard", {
            "reply_markup": {
                "keyboard": [["Jadwal Sholat"], ["Jadwal Puasa"], ["Al-Quran"]],
                "one_time_keyboard": true
            }
        });
    }
})