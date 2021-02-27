// second.js
// alert(colorCodes.back); // alerts `#fff`
var colorCodes = {
    "2021":
    {
        "01":
        {
            "04": ['senin'],
            "07": ['kamis'],
            "11": ['senin'],
            "14": ['kamis'],
            "18": ['senin'],
            "21": ['kamis'],
            "25": ['senin'],
            "26": ['bidh'],
            "27": ['bidh'],
            "28": ['kamis', 'bidh'],
        },
        "02":
        {
            "01": ['senin'],
            "04": ['kamis'],
            "08": ['senin'],
            "11": ['kamis'],
            "15": ['senin'],
            "18": ['kamis'],
            "22": ['senin'],
            "25": ['kamis', 'bidh'],
            "26": ['bidh'],
            "27": ['bidh'],
        },
        "03":
        {
            "01": ['senin'],
            "04": ['kamis'],
            "08": ['senin'],
            "11": ['kamis'],
            "15": ['senin'],
            "18": ['kamis'],
            "22": ['senin'],
            "25": ['kamis'],
            "27": ['bidh'],
            "28": ['bidh'],
            "29": ['senin', 'bidh'],
        },
        "04":
        {
            "01": ['kamis'],
            "05": ['senin'],
            "08": ['kamis'],
            "12": ['senin'],
            "13": ['ramadhan'],
            "14": ['ramadhan'],
            "15": ['ramadhan'],
            "16": ['ramadhan'],
            "17": ['ramadhan'],
            "18": ['ramadhan'],
            "19": ['ramadhan'],
            "20": ['ramadhan'],
            "21": ['ramadhan'],
            "22": ['ramadhan'],
            "23": ['ramadhan'],
            "24": ['ramadhan'],
            "25": ['ramadhan'],
            "26": ['ramadhan'],
            "27": ['ramadhan'],
            "28": ['ramadhan'],
            "29": ['ramadhan'],
            "30": ['ramadhan'],
        },
        "05":
        {
            "01": ['ramadhan'],
            "02": ['ramadhan'],
            "03": ['ramadhan'],
            "04": ['ramadhan'],
            "05": ['ramadhan'],
            "06": ['ramadhan'],
            "07": ['ramadhan'],
            "08": ['ramadhan'],
            "09": ['ramadhan'],
            "10": ['ramadhan'],
            "11": ['ramadhan'],
            "12": ['ramadhan'],
            "13": ['haram berpuasa'],
            "17": ['senin'],
            "20": ['kamis'],
            "24": ['senin'],
            "25": ['bidh'],
            "26": ['bidh'],
            "27": ['kamis', 'bidh'],
            "31": ['senin'],
        },
        "06":
        {
            "03": ['kamis'],
            "07": ['senin'],
            "10": ['kamis'],
            "14": ['senin'],
            "17": ['kamis'],
            "21": ['senin'],
            "24": ['kamis', 'bidh'],
            "28": ['senin'],
            "25": ['bidh'],
            "26": ['bidh'],
        },
        "07":
        {
            "01": ['kamis'],
            "05": ['senin'],
            "08": ['kamis'],
            "12": ['senin'],
            "15": ['kamis'],
            "19": ['senin', 'arafah'],
            "20": ['haram'],
            "21": ['haram'],
            "22": ['haram'],
            "23": ['haram'],
            "24": ['bidh'],
            "25": ['bidh'],
            "26": ['senin'],
            "29": ['kamis'],
        },
        "08":
        {
            "02": ['senin'],
            "05": ['kamis'],
            "09": ['senin'],
            "12": ['kamis'],
            "16": ['senin'],
            "18": ['tasu"a'],
            "19": ['kamis', 'asyura'],
            "22": ['bidh'],
            "23": ['senin', 'bidh'],
            "24": ['bidh'],
            "26": ['kamis'],
            "30": ['senin'],
        },
        "09":
        {
            "02": ['kamis'],
            "06": ['senin'],
            "09": ['kamis'],
            "13": ['senin'],
            "16": ['kamis'],
            "20": ['senin', 'bidh'],
            "21": ['bidh'],
            "22": ['bidh'],
            "23": ['kamis'],
            "27": ['senin'],
            "30": ['kamis'],
        },
        "10":
        {
            "04": ['senin'],
            "07": ['kamis'],
            "11": ['senin'],
            "14": ['kamis'],
            "18": ['senin'],
            "20": ['bidh'],
            "21": ['kamis', 'bidh'],
            "22": ['bidh'],
            "25": ['senin'],
            "28": ['kamis'],
        },
        "11":
        {
            "01": ['senin'],
            "08": ['senin'],
            "15": ['senin'],
            "22": ['senin'],
            "29": ['senin'],
            "04": ['kamis'],
            "11": ['kamis'],
            "18": ['kamis', 'bidh'],
            "19": ['bidh'],
            "20": ['bidh'],
            "25": ['kamis'],
        },
        "12":
        {
            "02": ['kamis'],
            "06": ['senin'],
            "09": ['kamis'],
            "13": ['senin'],
            "16": ['kamis'],
            "17": ['bidh'],
            "18": ['bidh'],
            "19": ['bidh'],
            "20": ['senin'],
            "23": ['kamis'],
            "27": ['senin'],
            "30": ['kamis'],
        }
    }

};

function getFasting() {
    console.log(colorCodes['2021']['01']['04'])
    // return colorCodes;
}

getFasting()
// exports.getFasting = getFasting;