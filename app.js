// import required package
const prayerTime = require('./prayer_time')
const fastingTime = require('./fasting_time')
const path = require('path');

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

// use webhook at production and polling at development phase
if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(TOKEN, options);
    bot.setWebHook(`${url}/bot${TOKEN}`);
} else {
    bot = new TelegramBot(TOKEN, { polling: true });
}

// print error when bot encountered error
bot.on("polling_error", console.log);
bot.on('webhook_error', console.log);

bot.on('message', (msg) => {
    var stringMsg = msg.text.toString().toLowerCase()
    if (stringMsg.indexOf('hi') === 0) {
        bot.sendMessage(msg.from.id, "Halo " + msg.from.first_name + ", DailyMuslim siap menemani kamu dalam beribadah");
    } else if (stringMsg.indexOf('help') === 0) {
        bot.sendMessage(msg.chat.id, "Silahkan pilih menu pada keyboard", {
            "reply_markup": {
                "keyboard": [["Jadwal Sholat"], ["Jadwal Puasa"], ["Al-Quran"]],
                "one_time_keyboard": true
            }
        });
    } else if (stringMsg.indexOf('jadwal sholat') === 0) {
        bot.sendMessage(msg.chat.id, "Perintah: sholat [nama_kota] \n \n Contoh: sholat boyolali \n");
    } else if (stringMsg.startsWith('sholat')) {
        var arrMsg = stringMsg.split(" ")
        var city_name = "";

        for (var i = 1; i < arrMsg.length - 1; i++) {
            city_name = city_name + arrMsg[i] + " ";
        }

        city_name += arrMsg[arrMsg.length - 1];

        try {
            const getPrayerTimeCall = async () => {
                const prayerTimesRes = await prayerTime.getPrayerTimeCity(city_name);
                if (prayerTimesRes !== "kota tidak dikenali") {
                    const prayerTimesParsed = JSON.parse(JSON.stringify(prayerTimesRes.data.jadwal.data))

                    var htmlfile = prayerTimesParsed.tanggal + "\n" + "===================\n" + "imsak      : " + prayerTimesParsed.imsak + "\n" + "subuh      : " + prayerTimesParsed.subuh + "\n" + "dhuha      : " + prayerTimesParsed.dhuha + "\n" + "dzuhur     : " + prayerTimesParsed.dzuhur + "\n" + "ashar       : " + prayerTimesParsed.ashar + "\n" + "maghrib  : " + prayerTimesParsed.maghrib + "\n" + "isya          : " + prayerTimesParsed.isya + "\n"
                    bot.sendMessage(msg.chat.id, htmlfile, { parse_mode: "HTML" });
                } else {
                    bot.sendMessage(msg.chat.id, prayerTimesRes);
                }
            }
            getPrayerTimeCall()
        } catch (error) {
            console.error(error)
        }
    } else if (stringMsg.indexOf('jadwal puasa') === 0) {
        var messageAddToGCal = "Apabila ingin menambahkan jadwal puasa sunnah ke google calendar dapat mengikuti tutorial berikut: \n \
                       ============================== \n \
                       http://bit.ly/PuasaSunnah_2021 \n \
                       ============================== \n \ catatan: hanya dapat dilakukan melalui laptop/komputer";

        bot.sendMessage(msg.chat.id, "Perintah: puasa [nama_bulan] \n \n Contoh: puasa januari");
        bot.sendMessage(msg.chat.id, messageAddToGCal);
    } else if (stringMsg.startsWith('puasa')) {
        var arrMsg = stringMsg.split(" ")
        const month = arrMsg[1].toLowerCase();
        try {
            const getFastingCal = async () => {
                const fastingCalendar = await fastingTime.getFastingCalendar(month);

                response = 'Puasa bulan ' + month + ' \n===================\n'
                for (var key in fastingCalendar) {
                    response = response + key + ': '

                    fastingName = fastingCalendar[key];
                    lenFastingNameArray = fastingName.length;
                    for (var i = 0; i < lenFastingNameArray - 1; i++) {
                        response = response + fastingName[i] + ', ';
                    }
                    response = response + fastingName[lenFastingNameArray - 1] + '\n';

                }
                bot.sendMessage(msg.chat.id, response);
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