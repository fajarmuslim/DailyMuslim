var fastingCalendar = {
    2021:
    {
        "januari":
        {
            4: ['senin'],
            7: ['kamis'],
            11: ['senin'],
            14: ['kamis'],
            18: ['senin'],
            21: ['kamis'],
            25: ['senin'],
            26: ['bidh'],
            27: ['bidh'],
            28: ['kamis', 'bidh'],
        },
        "februari":
        {
            1: ['senin'],
            4: ['kamis'],
            8: ['senin'],
            11: ['kamis'],
            15: ['senin'],
            18: ['kamis'],
            22: ['senin'],
            25: ['kamis', 'bidh'],
            26: ['bidh'],
            27: ['bidh'],
        },
        "maret":
        {
            1: ['senin'],
            4: ['kamis'],
            8: ['senin'],
            11: ['kamis'],
            15: ['senin'],
            18: ['kamis'],
            22: ['senin'],
            25: ['kamis'],
            27: ['bidh'],
            28: ['bidh'],
            29: ['senin', 'bidh'],
        },
        "april":
        {
            1: ['kamis'],
            5: ['senin'],
            8: ['kamis'],
            12: ['senin'],
            13: ['ramadhan'],
            14: ['ramadhan'],
            15: ['ramadhan'],
            16: ['ramadhan'],
            17: ['ramadhan'],
            18: ['ramadhan'],
            19: ['ramadhan'],
            20: ['ramadhan'],
            21: ['ramadhan'],
            22: ['ramadhan'],
            23: ['ramadhan'],
            24: ['ramadhan'],
            25: ['ramadhan'],
            26: ['ramadhan'],
            27: ['ramadhan'],
            28: ['ramadhan'],
            29: ['ramadhan'],
            30: ['ramadhan'],
        },
        "mei":
        {
            1: ['ramadhan'],
            2: ['ramadhan'],
            3: ['ramadhan'],
            4: ['ramadhan'],
            5: ['ramadhan'],
            6: ['ramadhan'],
            7: ['ramadhan'],
            8: ['ramadhan'],
            9: ['ramadhan'],
            10: ['ramadhan'],
            11: ['ramadhan'],
            12: ['ramadhan'],
            13: ['haram berpuasa'],
            17: ['senin'],
            20: ['kamis'],
            24: ['senin'],
            25: ['bidh'],
            26: ['bidh'],
            27: ['kamis', 'bidh'],
            31: ['senin'],
        },
        "juni":
        {
            3: ['kamis'],
            7: ['senin'],
            10: ['kamis'],
            14: ['senin'],
            17: ['kamis'],
            21: ['senin'],
            24: ['kamis', 'bidh'],
            25: ['bidh'],
            26: ['bidh'],
            28: ['senin'],
        },
        "juli":
        {
            1: ['kamis'],
            5: ['senin'],
            8: ['kamis'],
            12: ['senin'],
            15: ['kamis'],
            19: ['senin', 'arafah'],
            20: ['haram berpuasa'],
            21: ['haram berpuasa'],
            22: ['haram berpuasa'],
            23: ['haram berpuasa'],
            24: ['bidh'],
            25: ['bidh'],
            26: ['senin'],
            29: ['kamis'],
        },
        "agustus":
        {
            2: ['senin'],
            5: ['kamis'],
            9: ['senin'],
            12: ['kamis'],
            16: ['senin'],
            18: ['tasua'],
            19: ['kamis', 'asyura'],
            22: ['bidh'],
            23: ['senin', 'bidh'],
            24: ['bidh'],
            26: ['kamis'],
            30: ['senin'],
        },
        "september":
        {
            2: ['kamis'],
            6: ['senin'],
            9: ['kamis'],
            13: ['senin'],
            16: ['kamis'],
            20: ['senin', 'bidh'],
            21: ['bidh'],
            22: ['bidh'],
            23: ['kamis'],
            27: ['senin'],
            30: ['kamis'],
        },
        "oktober":
        {
            4: ['senin'],
            7: ['kamis'],
            11: ['senin'],
            14: ['kamis'],
            18: ['senin'],
            20: ['bidh'],
            21: ['kamis', 'bidh'],
            22: ['bidh'],
            25: ['senin'],
            28: ['kamis'],
        },
        "november":
        {
            1: ['senin'],
            8: ['senin'],
            15: ['senin'],
            22: ['senin'],
            29: ['senin'],
            4: ['kamis'],
            11: ['kamis'],
            18: ['kamis', 'bidh'],
            19: ['bidh'],
            20: ['bidh'],
            25: ['kamis'],
        },
        "desember":
        {
            2: ['kamis'],
            6: ['senin'],
            9: ['kamis'],
            13: ['senin'],
            16: ['kamis'],
            17: ['bidh'],
            18: ['bidh'],
            19: ['bidh'],
            20: ['senin'],
            23: ['kamis'],
            27: ['senin'],
            30: ['kamis'],
        }
    }

};

function getFastingCalendar(month) {
    return fastingCalendar[2021][month]
}

exports.getFastingCalendar = getFastingCalendar;