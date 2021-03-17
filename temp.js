// matches a number, some characters and another number
const reg = /{\d}/
const str = "Segala puji  bagi Allah, Tuhan semesta alam. {3}"
const newStr = str.replace(reg, "-");
console.log(newStr);
// "Java-Script"