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
        var todayDate = new Date().toISOString().slice(0, 10);
        const cityCode = await getCityCode(city)
        return await getPrayerTime(cityCode.data.kota[0].id, todayDate)
    } catch (error) {
        console.error(error)
    }
}

exports.getPrayerTimeCity = getPrayerTimeCity;