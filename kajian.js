const fs = require('fs')

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}

const newKajianExample = {
    id: "1",
    theme: "Persiapan menyongsong ramadhan",
    speaker: "Ust. Abdul Aziz. S.T., M.T",
    time: "Selasa, 13 April 2021",
    place: "Masjid Agung Trans Studio Bandung",
    description: "Kajian ini terbuka untuk umum, disarankan membawa mushaf untuk mempermudah penyerapan materi",
    city: "Bandung",
    status: "active"
}

function addKajian(newKajian) {
    jsonReader('./kajian.json', (err, listKajian) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }

        listKajian.push(newKajian)
        fs.writeFile('./kajian.json', JSON.stringify(listKajian), (err) => {
            if (err) console.log('Error writing file:', err)
        })
    })
}

// addKajian(newKajianExample)

exports.jsonReader = jsonReader