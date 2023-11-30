let submitBtn = document.querySelector('.submit__btn');
let tDate = document.querySelectorAll('.tdate');
let output = [...document.querySelectorAll(".output")];
let flags = 0;

const _31months = [1, 3, 5, 7, 8, 10, 12];
const _30months = [4, 6, 9, 11];

const actual = new Date(); // year, month, day

let cDate = [];



submitBtn.addEventListener("click", function () {
    const printY = async (out, stop) => {
        for (i = 0;i <= stop; i++) {
            out.textContent = await printer(i);
        }
    }
    const printM = async (out, stop) => {
        for (j = 0;j <= stop; j++) {
            out.textContent = await printer(j);
        }
    }
    const printD = async (out, stop) => {
        for (k = 0;k <= stop; k++) {
            out.textContent = await printer(k);
        }
    }

    let pDate = [...tDate];
    cDate = [];

    pDate.forEach(cleanMsg);

    pDate.forEach(checkFilled); //Checks if the fields were filled.
    
    if (checkFlags()) return 0;

    checkDate(pDate); //Checks if the the inputs were provided with the right kind of data.

    if (checkFlags()) return 0;

    pDate.map((tDate, i, primeArray) => {
        primeArray[i] = parseInt(tDate.value);
    });

    calculate(pDate);

    console.log(pDate);
    console.log(cDate);

    /* With these async functions expressions here, the output is printed. */
    printY(output[0],cDate[0]);
    printM(output[1],cDate[1]);
    printD(output[2],cDate[2]);

});


// This function here, restrict the data that can be entered. Only numbers are allowed.
// "Enter key" will have the same function as Tab
[...tDate].forEach((tDate) => {
    tDate.addEventListener("keydown", (e) => {
        let numbersAllows = ['0','1','2','3','4','5','6','7','8','9','Backspace','Tab'];
        if (e.key == 'Enter') {
            if (e.target.id == "tyear") {
                submitBtn.focus();
            }
            else {
                e.target.parentNode.nextSibling.nextSibling.focus();
            }
        }
        if(!numbersAllows.includes(e.key)) {
            e.preventDefault();
        };
    });
});



// This function ends program execution if an error were commited.
function checkFlags () { 
    if (flags > 0) {
        flags = 0;
        output.forEach(out => {
            out.textContent = '--';
        });
        return true;
    } else {
        return false;
    }
}


/* Functions to check if all the imputs were filled. */
function checkFilled (pDate) {
    if(pDate.value == '') {
        writeMsg(pDate, "This Field is required");
        errorWarning(pDate,1);
        ++flags;
    }
    else {
        cleanMsg(pDate);
        errorWarning(pDate,0);
    }
}


/* Functions to check if the data introduced satisface the requirements of the program */
function checkDate (pDate) {

    checkYear(pDate[2]);
    
    checkMonth(pDate[1], pDate[2]);

    checkDay(pDate[0], pDate[1], pDate[2]);

}

function checkYear(year) {
    if (parseInt(year.value) > actual.getFullYear()) {
        writeMsg(year, 'Must be in the past');
        errorWarning(year, 1);
        ++flags;
    } else {
        cleanMsg(year);
        errorWarning(year, 0);
    }
}

function checkMonth(month, year) {
    if (parseInt(month.value) > 12 || parseInt(month.value) <= 0) {
        writeMsg(month, 'Must be a valid month');
        errorWarning(month, 1);
        ++flags;
    } else if (parseInt(year.value) == actual.getFullYear() && parseInt(month.value) > actual.getMonth() + 1) {
        writeMsg(month, 'Must be in the past');
        errorWarning(month, 1);
        ++flags;
    } else {
        cleanMsg(month);
        errorWarning(month, 0);
    }
}

function checkDay (day, month, year) {

    let _dayValue = parseInt(day.value);
    let _monthValue = parseInt(month.value);
    let _yearValue = parseInt(year.value);
    
    if (_31months.includes(_monthValue)) {
        if (_dayValue > 31 || _dayValue <= 0) {
            writeMsg(day, 'Must be a valid day');
            errorWarning(day, 1);
            ++flags;
        } else {
            cleanMsg(day);
            errorWarning(day, 0);
        }
    } else if (_30months.includes(_monthValue)) {
        if (_dayValue > 30 || _dayValue <= 0) {
            writeMsg(day, 'Must be a valid day');
            errorWarning(day, 1);
            ++flags;
        } else {
            cleanMsg(day);
            errorWarning(day, 0);
        }
    } else if (_monthValue == 2) {
        if(checkLeapYear(_yearValue)) {
            if (_dayValue > 29 || _dayValue <= 0) {
                writeMsg(day, 'Must be a valid day');
                errorWarning(day, 1);
                ++flags;
            } else {
                cleanMsg(day);
                errorWarning(day, 0);
            }
        } else {
            if (_dayValue > 28 || _dayValue <= 0) {
                writeMsg(day, 'Must be a valid day');
                errorWarning(day, 1);
                ++flags;
            } else {
                cleanMsg(day);
                errorWarning(day, 0);
            }
        }
    } else {
        writeMsg(day, 'Must be a valid date');
        errorWarning(day, 1);
    }

    if (_yearValue == actual.getFullYear() && _monthValue == actual.getMonth() + 1 && _dayValue > actual.getDate()) {
        writeMsg(day, 'Must be in the past');
        errorWarning(day, 1);
        ++flags;
    }
}

function checkLeapYear(lyear) {
    let flag = 0;

    lyear % 4 == 0 ? lyear % 100 == 0 ? lyear % 400 == 0 ? flag = 0 : flag = 1 : flag = 0 : flag = 1;
    
    if (flag == 0) {
        return true;
    } else {
        return false;
    }
}


/* Functions to make the correponding calculations, so the desired output could be get */
function calculate(date) {
    let mflag = 0;
    let dflag = 0;
    let yflag = 0;
    let amonth = actual.getMonth() + 1;
    let aday = actual.getDate();
    
    dflag = aday - date[0];
    mflag = amonth - date[1];
    yflag = actual.getFullYear() - date[2];

    calcYear(yflag, mflag, dflag);

    calcMonth(mflag, dflag);

    calcDay(amonth, dflag, date[2]);

}

function calcYear(yflag, mflag, dflag) {

    if ((mflag >= 0 && dflag >= 0) || (mflag > 0 && dflag < 0)) {
        cDate.push(yflag);
    } else {
        cDate.push(yflag - 1);
    }

}

function calcMonth(mflag, dflag) {

    if (mflag >= 0 && dflag >= 0) {
        cDate.push(mflag);
    } else if (mflag < 0 && dflag >= 0) {
        cDate.push(mflag + 12);
    } else if (mflag <= 0 && dflag < 0) {
        cDate.push(mflag + 12 - 1);
    } else {
        cDate.push(mflag - 1);
    }

}

function calcDay (amonth, dflag, isLeap) {
    let pastMonthD = 0;
    let corrector = 0

    if (_31months.includes(amonth - 1) || amonth == 1) {
        pastMonthD = 31;
    } else if (_30months.includes(amonth - 1)) {
        pastMonthD = 30;
    } else {
        if (checkLeapYear(actual.getFullYear())) {
            pastMonthD = 29;
        } else {
            pastMonthD = 28;
        }
    }

    if (checkLeapYear(isLeap) && !checkLeapYear(actual.getFullYear()) && actual.getMonth() + 1 == 3 && dflag < 0) corrector += 1; // Lets say that the introduced date is february 29 of a leap year, and today is March 27 of the following year. Due to the fact that "this year" is not leap, there will be a day off that needs to be taken into account, so this sentence makes sure of it. The day off is counted when the "actual year" is a leap one.  
    
    if (dflag >= 0) {
        cDate.push(dflag + corrector);
    } else {
        cDate.push(pastMonthD + dflag + corrector);
    } 
    
}


/* Functions to write the msg to be shown in case of user error*/
function writeMsg(targetNode, msg) {
    let newMsg = document.createElement("h4");
    newMsg.textContent = msg;
    let ch = targetNode.nextElementSibling; 

    if (ch == null || ch.tagName != "H4") targetNode.parentNode.appendChild(newMsg); 
    else return 0;
}

function cleanMsg(target) {
    if (target.nextElementSibling) target.nextElementSibling.remove();
}


/* Function to style the imput border and its identifier in case of error */
function errorWarning(target, flag) {
    let parent = target.parentNode;
    let children = [...parent.childNodes];
    let obj = (children, node) => {
        let objective = '';
        for (child in children) {
            if (children[child].tagName && children[child].tagName == node ) {
                objective = children[child];
                break;
            }
        }
        return objective;
    };

    let h3ClassList = [...obj(children, "H3").classList];
    let inputClassList = [...obj(children, "INPUT").classList];

    if (!h3ClassList.includes("err") && !inputClassList.includes("err") && flag == 1) {
        obj(children, "H3").classList.add("err");
        obj(children, "INPUT").classList.add("err");
    } else if (h3ClassList.includes("err") && inputClassList.includes("err") && flag == 0) {
        obj(children, "H3").classList.remove("err");
        obj(children, "INPUT").classList.remove("err");
    }
}



/* This function plays as a delay, in order to create the ilusion of printing the desired output through an animation. It returns a promised that get fullfilled once the delay time has passed. A function is used, because it is needed that the promise gets resolved several times, otherwise it would not work, due to the 'promises functionality' of got solved once and for all. */
function printer(i) {
    return new Promise((re) => {
        setTimeout(() => {
            re(i);
        },45)
    });
}



