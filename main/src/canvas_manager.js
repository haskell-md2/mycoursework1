const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


const w = canvas.width;
const h = canvas.height;

ctx.font = "24px Arial ";

class Waver{

    constructor(freq){
        this._t = 0;
        this._amplitude = 10;
        this._freq = freq;

        this._waveprocess = this._runWave();
        this._amplitudeprocess = this._runReduce();

        this._dieMode = false;
    }

    getFreq(){
        return this._freq;
    }


    _waveDraw(){
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.lineWidth = 2;
    
        let x = 0;
        let y = 0;
    
        while (x < w) {
            y = h/2 + this._amplitude *  Math.sin(x*this._freq/2000 + this._t);
            ctx.lineTo(x, y);
            x = x + 1;
        }
        ctx.stroke();
    }

    _displayFreq(){
        ctx.fillText("Частота: " + this._freq+" Гц", 10, 50)
    }

    _tCalc(){
        this._t = this._t + Math.PI/10
        if (this._t >= 2*Math.PI) this._t = 0;
        if(this._amplitude > 0) this._amplitude = this._amplitude - 0.01;
    }

    _amplitudeCalc(){
        if(this._dieMode){
            if(this._amplitude > 0.5) {
                this._amplitude = this._amplitude/1.5;
            }else{
                this._amplitude = 0;
                this.instDie();
            }
        }else{
            if(this._amplitude > 0) this._amplitude = this._amplitude - 0.01;
        }
        
    }

    longDie(){
        this._dieMode = true;
    }

    instDie(){
        clearInterval(this._waveprocess);
        this._waveDraw();
        this._displayFreq();
        clearInterval(this._amplitudeprocess);
    }

    _runWave(){
        return setInterval(()=>{
            this._tCalc();
            this._waveDraw();
            this._displayFreq();
        },1)
    }

    _runReduce(){
        return setInterval(()=>{
            this._amplitudeCalc();
        },10)
    }


}

function displayWarn(){
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ff0000"; 
    ctx.fillText("Недопустимое натяжение струны", w/2, h/2)
    ctx.fillStyle = "#000000"; 
    ctx.textAlign = "start";
}


