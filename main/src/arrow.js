let arrow = document.getElementById('arrow');

let pianoblock = document.getElementById('piano-block');

let table = []
function calculateIntervals(){
    let start = 65.4;
    let r = 1 / (2)**(1/12);
    let notes = ['До','До#','Ре', 'Ре#', 'Ми','Фа', 'Фа#','Соль', 'Соль#','Ля','Ля#','Си']
    let cursive = 0;

    let res = [];
    for(let k = 0; k <= 60; k+=1){
        res.push([[start, Math.round(start/r*100)/100],notes[cursive] +(2 + Math.floor(k/12))]);
        cursive += 1;
        start = Math.round(start/r*100)/100;
        if (cursive == 12) cursive = 0;
    }
    table = res;
}
calculateIntervals();

function identify(freq){
    let interval = 0;
    let near = 0

    if(freq < 65) return 'Ниже большой октавы';
    if(freq > 1976) return 'Выше третий октавы'
    for(let k = 0; k <= 60; k++){
        if ((table[k][0][0] <= freq) && freq < table[k][0][1]){
            interval = table[k];
            if(k < 59) near = table[k+1]
            break;
        }
    }


    if(Math.abs(interval[0][0] - freq) <= Math.abs(interval[0][1] - freq)){
        return "~"+interval[1];
    }

    if(Math.abs(interval[0][0] - freq) > Math.abs(interval[0][1] - freq) && near != 0){
        return "~"+near[1];
    }


}

