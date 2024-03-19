const materials = {
    'st': [7.8,500,200],
    'al': [2.7,90,70],
    'me': [8.9,250,110]
}


//material
document.getElementById("material").onchange = (e)=>{
    let material = (e.target.value);
    document.getElementById("density").value = materials[material][0];
    document.getElementById("limit-strength").value = materials[material][1];
    document.getElementById("yng").value = materials[material][2];

    document.getElementById("density").dispatchEvent(new CustomEvent('change',{'detail': true}));;
    document.getElementById("limit-strength").dispatchEvent(new CustomEvent('change',{'detail': true}));
    document.getElementById("yng").dispatchEvent(new CustomEvent('change',{'detail': true}));
}

document.getElementById("density").onchange = (e) =>{
    if(!e.detail) document.getElementById("material").value = " ";
}

document.getElementById("d").onchange = (e) =>{
    document.getElementById("lim-f").innerHTML = Math.floor(( document.getElementById("limit-strength").value * (( e.target.value)/2)**2) * Math.PI)
}

document.getElementById("limit-strength").onchange = (e) =>{
    
    if(!e.detail) document.getElementById("material").value = " ";
    document.getElementById("lim-f").innerHTML =Math.floor( e.target.value * (((document.getElementById("d").value)/2)**2) * Math.PI)
}

document.getElementById("verb-r").onchange = (e) =>{
   
    turnovers = parseFloat(e.target.value);
    updateForce();
}


document.getElementById("force").onchange = (e) =>{
    convertForceToTurnovers()
    updateForce();
}


document.getElementById("yng").onchange = (e) =>{
    updateForce();
}

document.getElementById("virb-d").onchange = (e) =>{
    updateForce();
}

document.getElementById("d").onchange = (e) =>{
    updateForce();
}

document.getElementById("len").onchange = (e) =>{
    updateForce();
}


function convertForceToTurnovers(){
    let E = document.getElementById("yng").value;
    let S =  (((document.getElementById("d").value)/2)**2) * Math.PI;
    let L = document.getElementById("len").value / 100;

    let f = document.getElementById("force").value;

    let len  = f/(E*S/L);

    turnovers =  len/(2*Math.PI * ((document.getElementById("virb-d").value/100)/2));
}
///
