"use strict";


const message = () => {
    let date = new Date(),
    weekDays = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"],
    greeting = "Доброе утро",
    neyYear = new Date(date.getFullYear(), 11, 31),
    oneDay = 1000 * 60 * 60 * 24,
    daysLeft = 0;

    if (date.getHours() >= 12 && date.getHours() < 17) {
        greeting = "Добрый день";
    } else 
    if (date.getHours() >= 17 && date.getHours() < 22) {
        greeting = "Добрый вечер";
    } else 
    if (date.getHours() >= 22 && date.getHours() < 0) {
        greeting = "Добрoй ночи";
    } 

    if (date.getMonth() === 11 && date.getDate() > 31) {
    date.setFullYear(neyYear.getFullYear() + 1);
    }  

    const getYearsString = () => {
        const secondsEnd = daysLeft.toString().slice(-1);
        if (secondsEnd === 1) {
          return " день";
        } else if (secondsEnd === 2 || secondsEnd === 3 || secondsEnd === 4) {
          return " дня";
        } else {
          return " дней";
        }
      };

    daysLeft = Math.ceil((neyYear.getTime() - date.getTime())/(oneDay));

    return `${greeting}</br>` + 
            `Сегодня: ${weekDays.find( (item, index) => date.getDay() === index)}</br>` + 
            `Текущее время: ${date.toLocaleTimeString('en')}</br>` + 
            `До нового года осталось ${daysLeft} ` + getYearsString();
};

let newMessage = document.createElement("p");
newMessage.innerHTML = message();
document.body.appendChild(newMessage);