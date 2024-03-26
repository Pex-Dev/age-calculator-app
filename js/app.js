//----------------INPUTS---------------------------
const contDay = document.querySelector('#contDay');
const inputDay = document.querySelector('#inputDay');
const contMonth = document.querySelector('#contMonth');
const inputMonth = document.querySelector('#inputMonth');
const contYear = document.querySelector('#contYear');
const inputYear = document.querySelector('#inputYear');
const errorDay = document.querySelector('#errorDay');
const errorMonth = document.querySelector('#errorMonth');
const errorYear = document.querySelector('#errorYear');
const button = document.querySelector('#button');
//----------------RESULTS---------------------------
const resultDay = document.querySelector('#resultDay');
const resultMonth = document.querySelector('#resultMonth');
const resultYear = document.querySelector('#resultYear');
//----------------INPUTS EVENTS---------------------------
inputDay.addEventListener('input',()=>{
    inputDay.value = inputDay.value.slice(0, 2);  
});
inputDay.addEventListener('blur',()=>{
    checkDay(inputDay.value);
}); 

inputMonth.addEventListener('input',()=>{
    inputMonth.value = inputMonth.value.slice(0, 2);  
});
inputMonth.addEventListener('blur',()=>{
    checkMonth(inputMonth.value);
});

inputYear.addEventListener('input',()=>{
    inputYear.value = inputYear.value.slice(0, 4);  
});
inputYear.addEventListener('blur',()=>{
    checkYear(inputYear.value);
});
button.addEventListener('click',()=>{
    if(checkInputs()){
        calculateAge();
    }else{
        resultDay.textContent = '--';
        resultMonth.textContent = '--';
        resultYear.textContent = '--';
    }
})
//----------------VALIDATE INPUTS---------------------------
function checkInputs(){
    ok = true;
    contError = 0;
    if(!checkDay(inputDay.value)){
        contError++;
    }
    if(!checkMonth(inputMonth.value)){
        contError++;
    }
    if(!checkYear(inputYear.value)){
        contError++;
    }
    if(contError>0){
        ok = false;
    }
    return ok;
}

function checkDay(val){
    ok = true;
    if(val.length<1){
        ok = false;
        showError(contDay,errorDay,'The field is required');
    }else if(val>31 || val<1){
        ok = false;
        showError(contDay,errorDay,'Must be a valid day');
    }else if (inputMonth.value.length>0 && inputYear.value.length>0){
        validDay(val);
    }else{
        hiddeError(contDay,errorDay);
    }
    return ok;
}
function checkMonth(val){
    ok = true;
    if(val.length<1){
        ok = false;
        showError(contMonth,errorMonth,'The field is required')
    }else if(val>12 || val<0){
        ok = false;
        showError(contMonth,errorMonth,'Must be a valid month')
    }else{
        hiddeError(contMonth,errorMonth);
    }
    return ok;
}
function checkYear(val){
    ok = true;
    if(val.length<1){
        ok = false;
        showError(contYear,errorYear,'The field is required');
    }else if(val<1000){
        ok = false;
        showError(contYear,errorYear,'Must be a valid year');
    }else if(!pastYear(val)){
        ok = false;
        showError(contYear,errorYear,'Must be in the past');
    }else{
        hiddeError(contYear,errorYear);
    }
    return ok;
}
function validDay(day){
    ok = true;
    const has31 = has31Days(inputMonth.value,inputYear.value);
    if(!has31){//SI NO TIENE 31 DIAS
        if(day>30){
            ok = false;
            showError(contDay,errorDay,'Must be a valid date');
        }else{
            ok = true;
            hiddeError(contDay,errorDay);
        }
    }else{//SI TIENE 31 DIAS
        hiddeError(contDay,errorDay);
    }
    return ok;
}
//----------------ERROR MESSAGES--------------------
function showError(cont,error,message){
    error.textContent = message;
    cont.classList.add('error');
}
function hiddeError(cont,error){
    error.textContent = '';
    cont.classList.remove('error');
}
//---------------UTILITIES--------------------------
function has31Days(month, year) {
    let date = new Date(year, month, 1);
    date.setDate(date.getDate() - 1);
    return date.getDate() === 31;
}
function pastYear(year){
    let currentYear = (new Date()).getFullYear();
    if(year<currentYear){
        return true;
    }else{
        return false;
    }
}
document.addEventListener('focusin', function(event) {
    console.log('Teclado activado');
    // Puedes realizar acciones adicionales aquí, si es necesario
});

// Escucha el evento 'blur' en todos los campos de entrada
document.addEventListener('focusout', function(event) {
    console.log('Teclado desactivado');
    // Puedes realizar acciones adicionales aquí, si es necesario
});
//--------------------CALCULATE AGE--------------------
function calculateAge(){
    const birthDay = parseInt(inputDay.value);
    const birthMonth = parseInt(inputMonth.value);
    const birthYear = parseInt(inputYear.value);
    
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    let ageYear = currentYear - birthYear;
    
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        ageYear--;
    }
    
    let ageMonth = currentMonth - birthMonth;
    if (ageMonth < 0) {
        ageMonth += 12;
    }
    
    let ageDay = currentDay - birthDay;
    if (ageDay < 0) {
        let lastDayPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
        ageDay += lastDayPreviousMonth;
        ageMonth--;
    }
    
    resultDay.textContent = ageDay;
    resultMonth.textContent = ageMonth;
    resultYear.textContent = ageYear;
    

}