function compareTime(timeString1, timeString2) {
    let dateTime1 = new Date(timeString1);
    let dateTime2 = new Date(timeString2);
    if (isNaN(dateTime1.getTime()) || isNaN(dateTime2.getTime())) {
        throw new Error('Invalid date format');
    }
    return dateTime1.getTime() > dateTime2.getTime();
}

module.exports = {
    compareTime
}