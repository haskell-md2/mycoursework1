let peg = document.getElementById("peg");

let right = document.getElementById("right");
let left = document.getElementById("left");

let turnovers = 0;

let downed = false;
let factor = 1;




function rotate(){
    peg.style.transform = 'rotate('+(turnovers)*360+'deg)'
}

right.onmousedown = ((e) =>{
    downed = true;
    factor = 1;
})

right.onmouseup = ((e) =>{
    downed = false;
})

left.onmousedown = ((e) =>{
    downed = true;
    factor = -1;
})

left.onmouseup = ((e) =>{
    downed = false;
})

right.onmouseleave = ((e) =>{
    downed = false;
})

left.onmouseleave = ((e) =>{
    downed = false;
})

setInterval(()=>{
    if (downed){

        if (factor == -1 && (1/36 > turnovers)){
            turnovers = 0;
        }else{
            turnovers += 1/36 * factor;
     
        }

        updateForce();
    } 
},100)




function updateForce(){
    let E = document.getElementById("yng").value;
    let S =  (((document.getElementById("d").value)/2)**2) * Math.PI;
    let L = document.getElementById("len").value / 100;

    let len = 2*Math.PI * ((document.getElementById("virb-d").value/100)/2) * turnovers;

    let f = len * E*S/L;


    document.getElementById("force").value = Math.round(f);

    rotate(); 
    updateRotates();
}

function updateRotates(){
    console.log(turnovers)//dell
    document.getElementById("verb-r").value = Math.round((turnovers)*100)/100;
}