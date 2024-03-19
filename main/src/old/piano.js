const notes = {'C4': 261.63}



function keyPlay(note){

    actuall_freq = Math.floor((Tone.Frequency(note))*100)/100;

    soundPlay(actuall_freq)

    beginWave(actuall_freq);

}


function keyStop(note){
    soundStop(actuall_freq);
    stopWave();
}

