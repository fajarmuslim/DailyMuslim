// second.js
// alert(colorCodes.back); // alerts `#fff`
var colorCodes = {

    back: "#fff",
    front: "#888",
    side: "#369"

};
console.log(colorCodes.back);

function getFasting() {
    return colorCodes.back;
}

exports.getFasting = getFasting;