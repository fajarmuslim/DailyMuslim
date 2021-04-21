// import required package
const fs = require('fs');
const prayerTime = require('./prayer_time')
const fastingTime = require('./fasting_time')
const quran = require('./quran')
const kajian = require('./kajian')
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
                "keyboard": [["Jadwal Sholat"], ["Jadwal Puasa"], ["Al-Quran"], ['Jadwal Kajian'], ['One Minute Booster']],
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
    } else if (stringMsg.indexOf('al-quran') === 0) {
        bot.sendMessage(msg.chat.id, "Perintah: \n 1. Mencari 1 ayat dalam al-quran gunakan perintah: \nquran [nomor surat] [nomor ayat] \n \n Contoh: quran 2 4 \n\n2. Mencari beberapa ayat dalam al-quran secara berurutan gunakan perintah:\nquran [nomor surat] [nomor ayat mulai-nomor ayat selesai] \n\nContoh: quran 2 1-4 \n\n 3. Mencari beberapa ayat dalam al-quran secara acak gunakan perintah: quran [nomor surat] [nomor ayat,nomor ayat,nomor ayat] \n\nContoh: quran 2 1,2,5,7 \n\
        ");
    } else if (stringMsg.indexOf('quran') === 0) {
        var arrMsg = stringMsg.split(" ")
        const surahNumber = arrMsg[1].toLowerCase();
        const ayahNumber = arrMsg[2].toLowerCase();

        try {
            const getAyahCall = async () => {
                var getAyahResponse = await quran.getAyah(surahNumber, ayahNumber);
                var ayahArab = getAyahResponse.ayat.data.ar;
                var ayahIndonesian = getAyahResponse.ayat.data.id;

                var message = "Surat " + getAyahResponse.surat.nama + '\n\n';

                for (i = 0; i < ayahArab.length; i++) {
                    message = message + ayahArab[i].teks + ' (' + ayahArab[i].ayat + ')' + '\n';
                    var ayah_removed_notes_sign = ayahIndonesian[i].teks.replace(/{\d*}/g, '');
                    message = message + ayah_removed_notes_sign + '\n';
                }
                bot.sendMessage(msg.chat.id, message);
            }
            getAyahCall();
        } catch (error) {
            console.error(error);
        }
    } else if (stringMsg.indexOf('jadwal kajian') === 0) {
        bot.sendMessage(msg.chat.id, "Perintah: kajian [nama_kota] \n \n Contoh: kajian bandung\n");
    } else if (stringMsg.indexOf('kajian') === 0) {
        var arrMsg = stringMsg.split(" ")
        const cityName = arrMsg[1].toLowerCase();
        kajian.jsonReader('./kajian.json', (err, listKajian) => {
            var res = []
            if (err) {
                console.log(err)
                return
            }
            for (let i = 0; i < listKajian.length; i++) {
                if (listKajian[i].city == cityName) {
                    res.push(listKajian[i])
                }
            }

            var message = "Kajian di Kota " + res[0].city.charAt(0).toUpperCase() + res[0].city.slice(1) + "\n\n";

            for (let i = 0; i < res.length; i++) {
                message = message + "Kajian ke-" + (parseInt(i) + 1) + "\n";
                message = message + "Tema          : " + res[i].theme + "\n"
                message = message + "Pembicara : " + res[i].speaker + "\n"
                message = message + "Waktu         : " + res[i].time + "\n"
                message = message + "Tempat      : " + res[i].place + "\n"
                message = message + "Deskripsi   : " + res[i].description + "\n"
                if (i < (res.length - 1)) {
                    message += "\n\n"
                }
            }
            bot.sendMessage(msg.chat.id, message);

        })
    } else if (stringMsg.indexOf('one minute booster') === 0) {
        let files = fs.readdirSync('one_minute/');
        let rand = Math.floor(Math.random() * files.length);
        bot.sendAudio(msg.chat.id, 'one_minute/' + files[rand]);
    }
    else {
        bot.sendMessage(msg.from.id, 'Perintah yang anda masukkan tidak tersedia dalam sistem kami');
        bot.sendMessage(msg.chat.id, "Silahkan pilih menu pada keyboard", {
            "reply_markup": {
                "keyboard": [["Jadwal Sholat"], ["Jadwal Puasa"], ["Al-Quran"], ['Jadwal Kajian'], ['One Minute Booster']],
                "one_time_keyboard": true
            }
        });
    }
})