(function printCurrentDayName() {
    const currentDayContainer = document.getElementById("currentDay");
    const currentDayNumber = getCurrentDayNumber();
    currentDayContainer.innerHTML = getDayName(currentDayNumber);
})();

function getCurrentDayNumber() {
    const currentDate = new Date();
    return currentDate.getDay();
}

function getDayName(dayNumber) {
    switch (dayNumber) {
        case 1: 
            return "Понедельник";
        case 2: 
            return "Вторник";
        case 3: 
            return "Среда";        
        case 4: 
            return "Четверг";
        case 5: 
            return "Пятница";
        case 6: 
            return "Суббота";
        case 7: 
            return "Воскресенье";
        default:
            return "Ошибка";    
    }
}