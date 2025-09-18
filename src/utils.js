const { default: Colors } = require("./constants/Colors");

module.exports.formatNumber = function(num) {
    if (num !== undefined && !isNaN(num)) {
        return num.toLocaleString();
    } else return 0;
};

module.exports.getBackgrounds = (number) => {
    let array = Colors.shadesPrimary.concat(Colors.shadesSecondary);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, number);
};