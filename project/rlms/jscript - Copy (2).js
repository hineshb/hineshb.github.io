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

    //create tablebody
    var table = document.getElementById("dataTable");
    var tableBody = document.createElement("tbody");
    tableBody.setAttribute('id', "dataTableBody");

    for (var i = 0; i < info.length; i++) {
        //create elements
        var tr = document.createElement("tr");
        var tag = document.createElement("td");
        var name = document.createElement("td");
        var sku = document.createElement("td");
        //var skid = document.createElement("td");
        var location = document.createElement("td");
        var status = document.createElement("td");
        var shipdate = document.createElement("td");
        var lastupdate = document.createElement("td");
        var grade = document.createElement("td");
        var image = document.createElement("td");

        //set values and attributes
        //td.style.textAlign = 'center';
        tr.setAttribute('id', info[i].ttag);
        tag.innerText = info[i].ttag;
        name.setAttribute('id', info[i].name);
        name.innerText = info[i].name;
        sku.setAttribute('id', info[i].sku);
        sku.innerText = info[i].sku;
        //skid.innerText = info[i].skid;
        location.setAttribute('id', info[i].location);
        location.innerText = info[i].location;
        status.innerText = info[i].status;
        shipdate.innerText = info[i].shipdate;
        lastupdate.innerText = info[i].lastupdate;
        grade.innerText = info[i].grade;
        image.innerText = "image";//to be changed
        tag.onclick = function() {TBD(this)};

        //add to table
        tr.appendChild(tag);
        tr.appendChild(name);
        tr.appendChild(sku);
        //tr.appendChild(skid);
        tr.appendChild(location);
        tr.appendChild(status);
        tr.appendChild(shipdate);
        tr.appendChild(lastupdate);
        tr.appendChild(grade);
        tr.appendChild(image);
        
        tableBody.appendChild(tr);
        table.appendChild(tableBody);
    }
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

var searchOpts = ["TAG", "SKU", "SKID", "Location", "Name"];
var searchOpts2 = [];

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
    if(tag.test(str)){
        //alert("tag");
        if(searchOpts[0].match("TAG")){
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
        }else if(!searchOpts[0].match("TAG")){
            searchOpts[0] = str;
            var replaceSearch = document.getElementById("replaceTAG");
            replaceSearch.innerText=str;
        }
        console.log(searchOpts);
        runSearchTag();
    } else if(sku.test(str)){
        //alert("sku");
        if(searchOpts[1].match("SKU")){
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
        }else if(!searchOpts[1].match("SKU")){
            searchOpts[1] = str;
            var replaceSearch = document.getElementById("replaceSKU");
            replaceSearch.innerText=str;
        }
        searchOpts2.push(str);
        runSearch();
        console.log(searchOpts);
        console.log("opt2:" + searchOpts2);
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
        searchOpts2.push(str);
        runSearch();
        console.log(searchOpts);
        console.log("opt2:" + searchOpts2);
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
        searchOpts2.push(str);
        runSearch();
        console.log(searchOpts);
        console.log("opt2:" + searchOpts2);
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
        searchOpts2.push(str);
        runSearch();
        console.log(searchOpts);
        console.log("opt2:" + searchOpts2);
    }
}

function runSearchTag(){  
    //delete tablebody
    document.getElementById("dataTableBody").remove();
    //create tablebody
    var table = document.getElementById("dataTable");
    var tableBody = document.createElement("tbody");
    tableBody.setAttribute('id', "dataTableBody");

    console.log(searchOpts);

    //read json file
    fetch('info.json')
    .then(res => res.json())
    .then(function(data){
    //console.log(data.length)
    //console.log(document.getElementById("input").value)
     info = data; 
     
     var i = 0;
     while(i < info.length) {
        /*if(searchOpts[0] == info[i].sku && searchOpts[1] == info[i].ttag && searchOpts[2] == info[i].skid && searchOpts[3] == info[i].location && searchOpts[4] == info[i].name){
            console.log("all five");
        }else if(searchOpts[0] == info[i].sku){
            console.log("searched sku match");
        }
        else if(searchOpts[1] == info[i].ttag){
            console.log("searched sku match");
        }
        else if(searchOpts[2] == info[i].skid){
            console.log("searched sku match");
        }
        else if(searchOpts[3] == info[i].location){
            console.log("searched sku match");
        }
        else if(searchOpts[2] == info[i].name){
            console.log("searched sku match");
        }*/
        if(searchOpts[0] != "TAG"){
            console.log(searchOpts.length);
            console.log("test");
            if(searchOpts[0] == info[i].ttag){
            //create elements
            var tr = document.createElement("tr");
            var tag = document.createElement("td");
            var name = document.createElement("td");
            var sku = document.createElement("td");
            //var skid = document.createElement("td");
            var location = document.createElement("td");
            var status = document.createElement("td");
            var shipdate = document.createElement("td");
            var lastupdate = document.createElement("td");
            var grade = document.createElement("td");
            var image = document.createElement("td");
            
    
            //set values and attributes
            //td.style.textAlign = 'center';
            tr.setAttribute('id', info[i].ttag);
            tag.innerText = info[i].ttag;
            name.innerText = info[i].name;
            sku.innerText = info[i].sku;
            //skid.innerText = info[i].skid;
            location.innerText = info[i].location;
            status.innerText = info[i].status;
            shipdate.innerText = info[i].shipdate;
            lastupdate.innerText = info[i].lastupdate;
            grade.innerText = info[i].grade;
            image.innerText = "image";//to be changed
            tag.onclick = function() {TBD(this)};
    
            //add to table
            tr.appendChild(tag);
            tr.appendChild(name);
            tr.appendChild(sku);
            //tr.appendChild(skid);
            tr.appendChild(location);
            tr.appendChild(status);
            tr.appendChild(shipdate);
            tr.appendChild(lastupdate);
            tr.appendChild(grade);
            tr.appendChild(image);
            tableBody.appendChild(tr);
            table.appendChild(tableBody);
            }
            i++;
        }

     }

     /*
     //create elements
         var tr = document.createElement("tr");
         var tag = document.createElement("td");
         var name = document.createElement("td");
         var sku = document.createElement("td");
         var skid = document.createElement("td");
         var location = document.createElement("td");
         var status = document.createElement("td");
         var shipdate = document.createElement("td");
         var lastupdate = document.createElement("td");
         var grade = document.createElement("td");
         var image = document.createElement("td");
 
         //set values and attributes
         //td.style.textAlign = 'center';
         tr.setAttribute('id', info[i].ttag);
         tag.innerText = info[i].ttag;
         name.innerText = info[i].name;
         sku.innerText = info[i].sku;
         skid.innerText = info[i].skid;
         location.innerText = info[i].location;
         status.innerText = info[i].status;
         shipdate.innerText = info[i].shipdate;
         lastupdate.innerText = info[i].lastupdate;
         grade.innerText = info[i].grade;
         image.innerText = "image";//to be changed
         tag.onclick = function() {TBD(this)};
 
         //add to table
         tr.appendChild(tag);
         tr.appendChild(name);
         tr.appendChild(sku);
         tr.appendChild(skid);
         tr.appendChild(location);
         tr.appendChild(status);
         tr.appendChild(shipdate);
         tr.appendChild(lastupdate);
         tr.appendChild(grade);
         tr.appendChild(image);
         
         tableBody.appendChild(tr);
         table.appendChild(tableBody);
         */
    });

}

function runSearch(){  
    //delete tablebody
    //document.getElementById("dataTableBody").style.visibility = "hidden";
    //create tablebody
    //var table = document.getElementById("dataTable");
    //var tableBody = document.createElement("tbody");
    //tableBody.setAttribute('id', "dataTableBody");
    console.log(document.getElementById("dataTableBody"));

    //read json file
    fetch('info.json')
    .then(res => res.json())
    .then(function(data){
    //console.log(data.length)
    //console.log(document.getElementById("input").value)
     info = data; 
     console.log(info[1].SKU);

    });
    //https://www.encodedna.com/javascript/how-to-get-ids-of-div-element-inside-a-div-using-javascript.htm
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
    console.log(item);
    item.parentNode.remove();
    document.getElementById("dataTableBody").remove();
    loaddata();
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