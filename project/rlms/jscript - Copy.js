var info;

function loaddata(){
    fetch('info.json')
   .then(res => res.json())
   .then(function(data){
   //console.log(data.length)
   //console.log(document.getElementById("input").value)
    info = data; 
    console.log(info[1].ttag);
    console.log(info.length);
    
   });

}
window.onload = loaddata();
const tag = new RegExp('^[Tt][0-9]{8}$')
const skid = new RegExp('^[Ss][0-9]{6}$');
const sku = new RegExp('^[0-9]{8}$');
//const loca = new RegExp('^([0-9]{3})\s([0-9]{2})\s([0-9]{3})$');
//const loca = new RegExp('^[0-9]{3}\s[0-9]{2}\s[0-9]{3}$');
//const loca = new RegExp('^\d{3}\s+\d{2}\s+\d{3}$');
const loca = new RegExp('^[0-9]{3}-[0-9]{2}-[0-9]{2}$');

var searchOpts = ["SKU", "TAG", "SKID", "Location", "Name"];

function search(){
    var str = document.getElementById("input").value;
    if (str.match(/^\s*$/)) {
        alert("field empty");
        console.log("help");
    } else {
        sortSearch(str.trim());
        document.getElementById("input").value="";
    }
}


function sortSearch(str){
    //console.log(globalsearch);
    if(sku.test(str)){
        //alert("sku");
        if(searchOpts[0].match("SKU")){
            searchOpts[0] = str;

            //create elements
            var p = document.createElement("p");
            var string = document.createElement("span");
            var spacer = document.createElement("span");
            var span = document.createElement("span");
            var div = document.getElementById("searchResultHold");
            var closebtn = '\u2715';

            //set values and attributes
            p.classList.add("searchresult");
            //p.innerText = "SKU: " + str + "\xa0"+"\xa0";
            p.innerText = "SKU: ";
            string.setAttribute('id','replaceSKU');
            string.innerText = str;
            spacer.innerText = "\xa0"+"\xa0"
            span.setAttribute('id','closeSearchOpt');
            span.innerText=closebtn;
            span.onclick = function() {deleteSearch(this)};

            //add to div
            p.appendChild(string);
            p.appendChild(spacer);
            p.appendChild(span);
            div.appendChild(p);
        }else if(!searchOpts[0].match("SKU")){
            searchOpts[0] = str;
            var replaceSearch = document.getElementById("replaceSKU");
            replaceSearch.innerText=str;
        }
        console.log(searchOpts);
    } else if(tag.test(str)){
        //alert("tag");
        if(searchOpts[1].match("TAG")){
            searchOpts[1] = str;

            //create elements
            var p = document.createElement("p");
            var string = document.createElement("span");
            var spacer = document.createElement("span");
            var span = document.createElement("span");
            var div = document.getElementById("searchResultHold");
            var closebtn = '\u2715';

            //set values and attributes
            p.classList.add("searchresult");
            //p.innerText = "SKU: " + str + "\xa0"+"\xa0";
            p.innerText = "TAG: ";
            string.setAttribute('id','replaceTAG');
            string.innerText = str;
            spacer.innerText = "\xa0"+"\xa0"
            span.setAttribute('id','closeSearchOpt');
            span.innerText=closebtn;
            span.onclick = function() {deleteSearch(this)};

            //add to div
            p.appendChild(string);
            p.appendChild(spacer);
            p.appendChild(span);
            div.appendChild(p);
        }else if(!searchOpts[1].match("TAG")){
            searchOpts[1] = str;
            var replaceSearch = document.getElementById("replaceTAG");
            replaceSearch.innerText=str;
        }
        console.log(searchOpts);
    }else if(skid.test(str)){
        //alert("skid");
        if(searchOpts[2].match("SKID")){
            searchOpts[2] = str;

            //create elements
            var p = document.createElement("p");
            var string = document.createElement("span");
            var spacer = document.createElement("span");
            var span = document.createElement("span");
            var div = document.getElementById("searchResultHold");
            var closebtn = '\u2715';

            //set values and attributes
            p.classList.add("searchresult");
            //p.innerText = "SKU: " + str + "\xa0"+"\xa0";
            p.innerText = "SKID: ";
            string.setAttribute('id','replaceSKID');
            string.innerText = str;
            spacer.innerText = "\xa0"+"\xa0"
            span.setAttribute('id','closeSearchOpt');
            span.innerText=closebtn;
            span.onclick = function() {deleteSearch(this)};

            //add to div
            p.appendChild(string);
            p.appendChild(spacer);
            p.appendChild(span);
            div.appendChild(p);
        }else if(!searchOpts[2].match("SKID")){
            searchOpts[2] = str;
            var replaceSearch = document.getElementById("replaceSKID");
            replaceSearch.innerText=str;
        }
        console.log(searchOpts);
    }else if(loca.test(str)){
        //alert("location");
        if(searchOpts[3].match("Location")){
            searchOpts[3] = str;

            //create elements
            var p = document.createElement("p");
            var string = document.createElement("span");
            var spacer = document.createElement("span");
            var span = document.createElement("span");
            var div = document.getElementById("searchResultHold");
            var closebtn = '\u2715';

            //set values and attributes
            p.classList.add("searchresult");
            //p.innerText = "SKU: " + str + "\xa0"+"\xa0";
            p.innerText = "Location: ";
            string.setAttribute('id','replaceLocation');
            string.innerText = str;
            spacer.innerText = "\xa0"+"\xa0"
            span.setAttribute('id','closeSearchOpt');
            span.innerText=closebtn;
            span.onclick = function() {deleteSearch(this)};

            //add to div
            p.appendChild(string);
            p.appendChild(spacer);
            p.appendChild(span);
            div.appendChild(p);
        }else if(!searchOpts[3].match("Location")){
            searchOpts[3] = str;
            var replaceSearch = document.getElementById("replaceLocation");
            replaceSearch.innerText=str;
        }
        console.log(searchOpts);
    }else{
        if(searchOpts[4].match("Name")){
            searchOpts[4] = str;

            //create elements
            var p = document.createElement("p");
            var string = document.createElement("span");
            var spacer = document.createElement("span");
            var span = document.createElement("span");
            var div = document.getElementById("searchResultHold");
            var closebtn = '\u2715';

            //set values and attributes
            p.classList.add("searchresult");
            //p.innerText = "SKU: " + str + "\xa0"+"\xa0";
            p.innerText = "Name: ";
            string.setAttribute('id','replaceName');
            string.innerText = str;
            spacer.innerText = "\xa0"+"\xa0"
            span.setAttribute('id','closeSearchOpt');
            span.innerText=closebtn;
            span.onclick = function() {deleteSearch(this)};

            //add to div
            p.appendChild(string);
            p.appendChild(spacer);
            p.appendChild(span);
            div.appendChild(p);
        }else if(!searchOpts[4].match("Name")){
            searchOpts[4] = str;
            var replaceSearch = document.getElementById("replaceName");
            replaceSearch.innerText=str;
        }
        console.log(searchOpts);
    }
}

function deleteSearch(item){
    var string="";
    string = item.parentElement.childNodes[1].innerText;
    //console.log(item.parentNode);
    for (var i = 0; i < searchOpts.length; i++) {
        if(string == searchOpts[i]){
            if(i==0){
                searchOpts[i]="SKU";
            }else if(i==1){
                searchOpts[i]="TAG";
            }else if(i==2){
                searchOpts[i]="SKID";
            }
            else if(i==3){
                searchOpts[i]="Location";
            }
            else if(i==4){
                searchOpts[i]="Name";
            }         
        };
    }
    console.log(searchOpts);
    item.parentNode.remove();
}
/*function deleteSearch(item){
    item.parentNode.remove();
    var string="";
    string = item.parentElement.childNodes[1].innerText;
    //console.log(string);
    for (var i = 0; i < globalsearch.length; i++) {
        if(string == globalsearch[i]){
            globalsearch.splice(i,1);
            console.log(globalsearch);
        };
    }
}*/

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