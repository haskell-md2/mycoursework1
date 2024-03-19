let force, len, d, density = 0;

let actuall_freq = 0;

function setParam(){

    force = document.getElementById("force").value;
    len = document.getElementById("len").value / 100;
    d = document.getElementById("d").value / 1000;
    density = document.getElementById("density").value *1000;
}


function calculateFrequency(){
    return Math.round((1/(len*d) * Math.sqrt(force/(density*Math.PI)))*100)/100
}


document.getElementById("press").onmousedown = (e)=>{

    hideImposib();

    let f = document.getElementById("force").value;
    let lim = parseFloat(document.getElementById("lim-f").innerHTML);
    

    if(f > lim) {
        displayWarn();
        return;
    }

    setParam();

    let freq = calculateFrequency();

    if(waver != null) waver.instDie();

    waver = new Waver(freq);
    soundPlay(waver.getFreq());

    document.getElementById("note-block").innerHTML = identify(freq);
}



document.getElementById("press").onmouseup = (e)=>{
    if(waver == null) return;
    soundStop(waver.getFreq());
    waver.longDie();
}

document.getElementById("press").onmouseleave = (e) =>{
    if(waver == null) return;
    soundStop(waver.getFreq());
    waver.longDie();
}