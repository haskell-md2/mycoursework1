const sampler = new Tone.Sampler({
	urls: {
		"C4": "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		"A4": "A4.mp3",
        "C5": "C5.mp3",
		"D#5": "Ds5.mp3",
		"F#5": "Fs5.mp3",
		"A5": "A5.mp3",
	},
	release: 1,
	baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();



function soundPlay(freq){
    // trigger the attack immediately
    sampler.triggerAttack([freq])

}

function soundStop(freq){
    sampler.triggerRelease(freq);
}



let waver = null;

function keyPlay(note){

    hideImposib();

    let freq = Math.floor((Tone.Frequency(note))*100)/100;

    if(waver != null) waver.instDie();
    waver = new Waver(freq);
    soundPlay(waver.getFreq());
    

    document.getElementById("note-block").innerHTML = translate(note);
    
    let inForce = toForce(freq);
    if(inForce <= parseFloat(document.getElementById("lim-f").innerHTML)){
        document.getElementById("force").value = inForce;
        convertForceToTurnovers();
        updateForce();
    }else{
        document.getElementById("imposib").style = "color: red";
    }
}

function hideImposib(){
    document.getElementById("imposib").style = "color: white";
}


function keyStop(){
    if(waver == null) return;
    soundStop(waver.getFreq());
    waver.longDie();
}


function translate(s){
    s = s.replace('C','До');
    s = s.replace('D','Ре');
    s = s.replace('E','Ми');
    s = s.replace('F','Фа');
    s = s.replace('G','Соль');
    s = s.replace('A','Ля');
    s = s.replace('B','Си');

    return s;
}

function toForce(freq){

    force = document.getElementById("force").value;
    len = document.getElementById("len").value / 100;
    d = document.getElementById("d").value / 1000;
    density = document.getElementById("density").value *1000;

    return Math.round( ((freq*len*d)**2 * density * Math.PI )  *100 )/100
}