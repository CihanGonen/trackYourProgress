class myFuncs {
  static getTimePretty = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return day + "/" + month + "/" + year;
  };

  static checkTime = (time, timeArr) => {
    if (timeArr.includes(time)) {
      return timeArr;
    } else {
      return [...timeArr, time];
    }
  };

  static percentDif = (first, last) => {
    const diff = last - first;
    const percent = (100 * diff) / first;
    return percent.toFixed(2);
  };

  static reverseArr = (arr) => {
    if (arr.length > 5) {
      const reversedArr = arr.slice(0).reverse();
      return reversedArr.slice(0, 5).reverse();
    } else {
      return arr;
    }
  };
}

module.exports = myFuncs;
