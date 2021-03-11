const axios = require('axios')

const getCityCode = async (city) => {
    try {
        return await axios.get('https://api.banghasan.com/sholat/format/json/kota/nama/' + city)
    } catch (error) {
        console.error(error)
    }
}

const getPrayerTime = async (city_code, date) => {
    try {
        return await axios.get(' https://api.banghasan.com/sholat/format/json/jadwal/kota/' + city_code + '/tanggal/' + date)
    } catch (error) {
        console.error(error)
    }
}

const getPrayerTimeCity = async (city) => {
    try {
        var jakartaTime = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta", year: 'numeric', month: '2-digit', day: '2-digit' });
        var splittedJakartaTime = jakartaTime.split('/');
        var todayDate = splittedJakartaTime[2] + '-' + splittedJakartaTime[1] + '-' + splittedJakartaTime[0];
        const cityCode = await getCityCode(city);

        if (cityCode.data.kota.length !== 0) {
            return await getPrayerTime(cityCode.data.kota[0].id, todayDate)
        } else {
            return "kota tidak dikenali";
        }
    } catch (error) {
        console.error(error);
    }
}

exports.getPrayerTimeCity = getPrayerTimeCity;