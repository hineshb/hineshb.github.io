var info;
    fetch('info.json')
   .then(res => res.json())
   .then(function(data){
   //console.log(data.length)
   //console.log(document.getElementById("input").value)
    info = data; 
    console.log(info);
   });

const tag = new RegExp('^[Tt][0-9]{8}$')
const skid = new RegExp('^[Ss][0-9]{6}$');
const sku = new RegExp('^[0-9]{6}$');
//const loca = new RegExp('^([0-9]{3})\s([0-9]{2})\s([0-9]{3})$');
//const loca = new RegExp('^[0-9]{3}\s[0-9]{2}\s[0-9]{3}$');
//const loca = new RegExp('^\d{3}\s+\d{2}\s+\d{3}$');
const loca = new RegExp('^[0-9]{3}-[0-9]{2}-[0-9]{3}$');


function search(){
    var str = document.getElementById("input").value;
    if (str.match(/^\s*$/)) {
        alert("field empty");
        console.log("help");
    } else {
        sortSearch(str);
    }
}

function sortSearch(str){
    /*if(str.substring(0, 1) === 'T' || str.substring(0, 1) === 't'){
        alert("tag");
    }else if(str.substring(0, 1) === 'S' || str.substring(0, 1) === 's'){
        alert("skid");
    }*/
    if(sku.test(str)){
        alert("sku");
    }else if(tag.test(str)){
        alert("tag");
    }else if(skid.test(str)){
        alert("skid");
    }else if(loca.test(str)){
        console.log("hello")
        alert("location");
    }else{
        alert("not found");
    }
}

function myFunction(str) {
    console.log("what");
    var arrayLength= info.length;

    console.log(char);
    for (var i = 0; i < arrayLength; i++) {
        console.log(info[i].ttag);
        
    }
}
    

/*.then((res) => {
 const data = res.data;
 console.log(res.Object.value(data))
 // do the rest here
});*/