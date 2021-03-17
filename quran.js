const axios = require('axios')

const getSurahName = async (surahNumber) => {
    try {
        const surahName = await axios.get('https://api.banghasan.com/quran/format/json/surat/' + surahNumber)
        if (surahName.status == 200) {
            console.log(JSON.stringify(surahName.data.hasil))
        }
    } catch (error) {
        console.error(error)
    }
}

const getAyah = async (surahNumber, ayahNumber) => {
    try {
        const ayah = await axios.get('https://api.banghasan.com/quran/format/json/surat/' + surahNumber + '/ayat/' + ayahNumber)
        if (ayah.status == 200) {
            console.log(JSON.stringify(ayah.data))
        }
    } catch (error) {
        console.error(error)
    }
}

const getAllSurah = async () => {
    try {
        const allSurah = await axios.get('https://api.banghasan.com/quran/format/json/surat')
        if (allSurah.status == 200) {
            console.log(JSON.stringify(allSurah.data))
        }
    } catch (error) {
        console.error(error)
    }
}

const getAyahLanguage = async (surahNumber, ayahNumber, language) => {
    try {
        const ayahLanguage = await axios.get('https://api.banghasan.com/quran/format/json/surat/' + surahNumber + '/ayat/' + ayahNumber + '/bahasa/' + language)
        if (ayahLanguage.status == 200) {
            console.log(JSON.stringify(ayahLanguage.data))
        }
    } catch (error) {
        console.error(error)
    }
}

const getAllLanguage = async () => {
    try {
        const allLanguage = await axios.get('https://api.banghasan.com/quran/format/json/bahasa')
        if (allLanguage.status == 200) {
            console.log(JSON.stringify(allLanguage.data))
        }
    } catch (error) {
        console.error(error)
    }
}

const search = async (phrase, start, limit, language) => {
    try {
        const allLanguage = await axios.get('https://api.banghasan.com/quran/format/json/cari/' + phrase + '/bahasa/' + language + '/mulai/' + start + '/limit/' + limit)
        if (allLanguage.status == 200) {
            console.log(JSON.stringify(allLanguage.data))
        }
    } catch (error) {
        console.error(error)
    }
}

const getDepagNote = async (noteNumber) => {
    try {
        const depagNote = await axios.get('https://api.banghasan.com/quran/format/json/catatan/' + noteNumber)
        if (depagNote.status == 200) {
            console.log(JSON.stringify(depagNote.data))
        }
    } catch (error) {
        console.error(error)
    }
}

const getRandomAyah = async (language) => {
    try {
        var depagNote = null
        if (language == 'id') {
            depagNote = await axios.get('https://api.banghasan.com/quran/format/json/acak')
            if (depagNote.status == 200) {
                console.log(JSON.stringify(depagNote.data))
            }
        } else if (language == 'en') {
            depagNote = await axios.get('https://api.banghasan.com/quran/format/json/random')
            if (depagNote.status == 200) {
                console.log(JSON.stringify(depagNote.data))
            }
        }
    } catch (error) {
        console.error(error)
    }
}

// getAllSurah()
// getSurahName(12)
// getAyah(1, 1)
// getAyah(1, '1-7')
// getAyah(1, '1,2,3')
// getAyahLanguage(4, '1-3', 'id,ar,idt')
// getAyahLanguage(4, '1-3', 'id,ar')
// getAyahLanguage(4, '1-3', 'id,')
// getAllLanguage()
// search('segala%20puji', 0, 10, 'id')
// search('segala%20%2bpuji', 0, 10, 'id')
// search('good%20%2bnight', 0, 10, 'en')
// getDepagNote(112)
// getRandomAyah('id')

exports.getAllSurah = getAllSurah;
exports.getSurahName = getSurahName;
exports.getAyah = getAyah;
exports.getAyahLanguage = getAyahLanguage;
exports.getAllLanguage = getAllLanguage;
exports.search = search;
exports.getDepagNote = getDepagNote;
exports.getRandomAyah = getRandomAyah;