const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


const w = canvas.width;
const h = canvas.height;

ctx.font = "24px serif";
ctx.fillText("0 Гц", 10, 50)





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


function displayFreq(){
    ctx.fillText(actuall_freq+" Гц", 10, 50)
}

function waveDraw(){

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.lineWidth = 2;

    let x = 0;
    let y = 0;


    while (x < w) {
        y = h/2 + amplitude *  Math.sin(x*freq/2000 + t);
        ctx.lineTo(x, y);
        x = x + 1;
    }
    ctx.stroke();

    displayFreq();

}

let t = 0
let cou = 0;
let amplitude = 0;
let freq = 124;


function beginWave(fr){
    freq = fr;
    amplitude = 10;

    let wave = setInterval(()=>{
        waveDraw();
        t = t + Math.PI/10
        cou += 1
        if (t >= 2*Math.PI) t = 0;
        if(amplitude > 0) amplitude = amplitude - 0.01;
        if (amplitude <= 0) clearInterval(wave);
    },1)
}



function stopWave(){
    let amp_reduce = setInterval(() =>{
        amplitude = amplitude/1.5;
        if (amplitude < 1){
            clearInterval(amp_reduce);
        }
    },10)
    
}




function soundPlay(freq){
    // trigger the attack immediately
    sampler.triggerAttack([freq])

}

function soundStop(freq){

    sampler.triggerRelease(freq);
}