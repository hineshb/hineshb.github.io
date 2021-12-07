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
    tableBody.style.height = "calc( 100vh - 200px )";

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
        tr.setAttribute('id', "itemRow");
        tag.setAttribute('id','clickableTag');
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
        grade.style.paddingLeft = "50px";
        grade.innerText = info[i].grade;
        image.innerText = "image";//to be changed

        //Onclick open functions
        tag.ondblclick = function() {tagSheet(this)};
        name.onclick = function() {TBD(this, info)};
        sku.onclick = function() {TBD(this, info)};
        location.onclick = function() {TBD(this, info)};
        shipdate.onclick = function() {TBD(this, info)};
        status.onclick = function() {TBD(this, info)};
        lastupdate.onclick = function() {TBD(this, info)};
        grade.onclick = function() {TBD(this, info)};
        image.onclick = function() {TBD(this, info)};

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
const sku = new RegExp('^[0-9]{7}$');
//const loca = new RegExp('^([0-9]{3})\s([0-9]{2})\s([0-9]{3})$');
//const loca = new RegExp('^[0-9]{3}\s[0-9]{2}\s[0-9]{3}$');
//const loca = new RegExp('^\d{3}\s+\d{2}\s+\d{3}$');
const loca = new RegExp('^[0-9]{3}-[0-9]{2}-[0-9]{2}$');

var searchOpts = ["TAG", "SKU", "SKID", "Location", "Name"];
var currentTag;

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
            var node = document.getElementById("searchResultHold");
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }

            searchOpts[0] = str;
            searchOpts[1]="SKU";
			searchOpts[2]="SKID";
			searchOpts[3]="Location";
			searchOpts[4]="Name";
            
            //disable search
            //disableSearchBar();

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
            span.setAttribute('id','closeSearchOptTag');
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
        runSearch();
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
        runSearch();
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
        runSearch();
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
        runSearch();
        console.log(searchOpts);
    }
}

function runSearchTag(){  
    //delete elements in tablebody
    var node = document.getElementById("dataTableBody");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    node.style.height = "calc( 100vh - 270px )";

    fetch('info.json')
   .then(res => res.json())
   .then(function(data){

    info = data; 
    console.log(info[1].ttag);
    console.log(info.length);

    //create tablebody
    //var table = document.getElementById("dataTable");
    var tableBody = document.getElementById("dataTableBody");
    //tableBody.setAttribute('id', "dataTableBody");

    var i = 0;
    while(i < info.length) {
        if(searchOpts[0] != "TAG"){
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
                tr.setAttribute('id', "itemRow");
                tag.setAttribute('id','clickableTag');
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
                grade.style.paddingLeft = "50px";
                grade.innerText = info[i].grade;
                image.innerText = "image";//to be changed
                
                //Onclick open functions
                tag.ondblclick = function() {tagSheet(this)};
                name.onclick = function() {TBD(this, info)};
                sku.onclick = function() {TBD(this, info)};
                location.onclick = function() {TBD(this, info)};
                shipdate.onclick = function() {TBD(this, info)};
                status.onclick = function() {TBD(this, info)};
                lastupdate.onclick = function() {TBD(this, info)};
                grade.onclick = function() {TBD(this, info)};
                image.onclick = function() {TBD(this, info)};

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
                console.log(tableBody);
                tableBody.appendChild(tr);
            }
        i++;
        }
    }
    });

}

function runSearch(){  
    //delete tablebody
    //document.getElementById("dataTableBody").style.visibility = "hidden";
    //create tablebody
    //var table = document.getElementById("dataTable");
    //var tableBody = document.createElement("tbody");
    //tableBody.setAttribute('id', "dataTableBody");

    //delete Tag Search
    if(document.getElementById("closeSearchOptTag")){
        document.getElementById("closeSearchOptTag").parentElement.remove();
        searchOpts[0]="TAG";
    }

    //delete elements in tablebody
    var tableBody = document.getElementById("dataTableBody");
    var node = document.getElementById("dataTableBody");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    node.style.height = "calc( 100vh - 250px )";

    
    //read json file
    fetch('info.json')
    .then(res => res.json())
    .then(function(data){
    //console.log(data.length)
    //console.log(document.getElementById("input").value)
    
     info = data; 
     //console.log(info[1].SKU);

    //create tablebody
    //var table = document.getElementById("dataTable");

    //tableBody.setAttribute('id', "dataTableBody");
    console.log(searchOpts[1]!=("SKU"));
    console.log(searchOpts[3]!=("Location"));
    console.log(searchOpts[4]!=("Name"));

        if(searchOpts[1]!=("SKU") && searchOpts[3]!=("Location") && searchOpts[4]!=("Name")){
            for(var i=0; i<info.length;i++){
                if(searchOpts[1] === info[i].sku && searchOpts[3] === info[i].location && info[i].name.toLowerCase().includes(searchOpts[4].toLowerCase())){
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
                        tr.setAttribute('id', "itemRow");
                        tag.setAttribute('id','clickableTag');
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
                        grade.style.paddingLeft = "50px";
                        grade.innerText = info[i].grade;
                        image.innerText = "image";//to be changed
                        
                        //Onclick open functions
                        tag.ondblclick = function() {tagSheet(this)};
                        name.onclick = function() {TBD(this, info)};
                        sku.onclick = function() {TBD(this, info)};
                        location.onclick = function() {TBD(this, info)};
                        shipdate.onclick = function() {TBD(this, info)};
                        status.onclick = function() {TBD(this, info)};
                        lastupdate.onclick = function() {TBD(this, info)};
                        grade.onclick = function() {TBD(this, info)};
                        image.onclick = function() {TBD(this, info)};

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
                        console.log(tableBody);
                        tableBody.appendChild(tr);
                }
            }
        }
        else if(searchOpts[1]!=("SKU") && searchOpts[3]!=("Location")){
            for(var i=0; i<info.length;i++){
                if(searchOpts[1] === info[i].sku && searchOpts[3] === info[i].location){
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
                        tr.setAttribute('id', "itemRow");
                        tag.setAttribute('id','clickableTag');
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
                        grade.style.paddingLeft = "50px";
                        grade.innerText = info[i].grade;
                        image.innerText = "image";//to be changed
                        
                        //Onclick open functions
                        tag.ondblclick = function() {tagSheet(this)};
                        name.onclick = function() {TBD(this, info)};
                        sku.onclick = function() {TBD(this, info)};
                        location.onclick = function() {TBD(this, info)};
                        shipdate.onclick = function() {TBD(this, info)};
                        status.onclick = function() {TBD(this, info)};
                        lastupdate.onclick = function() {TBD(this, info)};
                        grade.onclick = function() {TBD(this, info)};
                        image.onclick = function() {TBD(this, info)};

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
                        console.log(tableBody);
                        tableBody.appendChild(tr);
                }
            }
        }
        else if(searchOpts[1]!=("SKU") && searchOpts[4]!=("Name")){
            for(var i=0; i<info.length;i++){
                if(searchOpts[1] === info[i].sku && info[i].name.toLowerCase().includes(searchOpts[4].toLowerCase())){
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
                        tr.setAttribute('id', "itemRow");
                        tag.setAttribute('id','clickableTag');
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
                        grade.style.paddingLeft = "50px";
                        grade.innerText = info[i].grade;
                        image.innerText = "image";//to be changed
                        
                        //Onclick open functions
                        tag.ondblclick = function() {tagSheet(this)};
                        name.onclick = function() {TBD(this, info)};
                        sku.onclick = function() {TBD(this, info)};
                        location.onclick = function() {TBD(this, info)};
                        shipdate.onclick = function() {TBD(this, info)};
                        status.onclick = function() {TBD(this, info)};
                        lastupdate.onclick = function() {TBD(this, info)};
                        grade.onclick = function() {TBD(this, info)};
                        image.onclick = function() {TBD(this, info)};

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
                        console.log(tableBody);
                        tableBody.appendChild(tr);
                }
            }
        }
        else if(searchOpts[3]!=("Location") && searchOpts[4]!=("Name")){
            for(var i=0; i<info.length;i++){
                if(searchOpts[3] === info[i].location && info[i].name.toLowerCase().includes(searchOpts[4].toLowerCase())){
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
                        tr.setAttribute('id', "itemRow");
                        tag.setAttribute('id','clickableTag');
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
                        grade.style.paddingLeft = "50px";
                        grade.innerText = info[i].grade;
                        image.innerText = "image";//to be changed
                        
                        //Onclick open functions
                        tag.ondblclick = function() {tagSheet(this)};
                        name.onclick = function() {TBD(this, info)};
                        sku.onclick = function() {TBD(this, info)};
                        location.onclick = function() {TBD(this, info)};
                        shipdate.onclick = function() {TBD(this, info)};
                        status.onclick = function() {TBD(this, info)};
                        lastupdate.onclick = function() {TBD(this, info)};
                        grade.onclick = function() {TBD(this, info)};
                        image.onclick = function() {TBD(this, info)};

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
                        console.log(tableBody);
                        tableBody.appendChild(tr);
                }
            }
        }
        else if(searchOpts[1]!=("SKU")){
            for(var i=0; i<info.length;i++){
                if(searchOpts[1] === info[i].sku){
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
                        tr.setAttribute('id', "itemRow");
                        tag.setAttribute('id','clickableTag');
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
                        grade.style.paddingLeft = "50px";
                        grade.innerText = info[i].grade;
                        image.innerText = "image";//to be changed
                        
                        //Onclick open functions
                        tag.ondblclick = function() {tagSheet(this)};
                        name.onclick = function() {TBD(this, info)};
                        sku.onclick = function() {TBD(this, info)};
                        location.onclick = function() {TBD(this, info)};
                        shipdate.onclick = function() {TBD(this, info)};
                        status.onclick = function() {TBD(this, info)};
                        lastupdate.onclick = function() {TBD(this, info)};
                        grade.onclick = function() {TBD(this, info)};
                        image.onclick = function() {TBD(this, info)};

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
                        console.log(tableBody);
                        tableBody.appendChild(tr);
                }
            }
        }
        else if(searchOpts[3]!=("Location")){
            for(var i=0; i<info.length;i++){
                if(searchOpts[3] === info[i].location){
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
                        tr.setAttribute('id', "itemRow");
                        tag.setAttribute('id','clickableTag');
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
                        grade.style.paddingLeft = "50px";
                        grade.innerText = info[i].grade;
                        image.innerText = "image";//to be changed
                        
                        //Onclick open functions
                        tag.ondblclick = function() {tagSheet(this)};
                        name.onclick = function() {TBD(this, info)};
                        sku.onclick = function() {TBD(this, info)};
                        location.onclick = function() {TBD(this, info)};
                        shipdate.onclick = function() {TBD(this, info)};
                        status.onclick = function() {TBD(this, info)};
                        lastupdate.onclick = function() {TBD(this, info)};
                        grade.onclick = function() {TBD(this, info)};
                        image.onclick = function() {TBD(this, info)};

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
                        console.log(tableBody);
                        tableBody.appendChild(tr);
                }
            }
        }
        else if(searchOpts[4]!=("Name")){
            for(var i=0; i<info.length;i++){
                if(info[i].name.toLowerCase().includes(searchOpts[4].toLowerCase())){
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
                        tr.setAttribute('id', "itemRow");
                        tag.setAttribute('id','clickableTag');
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
                        grade.style.paddingLeft = "50px";
                        grade.innerText = info[i].grade;
                        image.innerText = "image";//to be changed
                        
                        //Onclick open functions
                        tag.ondblclick = function() {tagSheet(this)};
                        name.onclick = function() {TBD(this, info)};
                        sku.onclick = function() {TBD(this, info)};
                        location.onclick = function() {TBD(this, info)};
                        shipdate.onclick = function() {TBD(this, info)};
                        status.onclick = function() {TBD(this, info)};
                        lastupdate.onclick = function() {TBD(this, info)};
                        grade.onclick = function() {TBD(this, info)};
                        image.onclick = function() {TBD(this, info)};

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
                        console.log(tableBody);
                        tableBody.appendChild(tr);
                }
            }
        }
    });
}


function deleteSearch(item, info){
    console.log(info);
    var string="";
    string = item.parentElement.childNodes[1].innerText;
    //console.log(item.parentNode);
    for (var i = 0; i < searchOpts.length; i++) {
        if(string == searchOpts[i]){
            if(i==0){
                searchOpts[i]="TAG";
            }else if(i==1){
                searchOpts[i]="SKU";
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
    if(searchOpts[0]==="TAG" && searchOpts[1]==="SKU" && searchOpts[3]==="Location" && searchOpts[4]==="Name"){
        item.parentNode.remove();
        document.getElementById("dataTableBody").remove();
        loaddata();
    }
    else{
        item.parentNode.remove();
        if(searchOpts[0]==="TAG"){
            runSearch();
        }else{
            runSearchTag();
        }
        
    }
    
    
}

function TBD(item, info){
    //console.log("Clicked on " + item.innerText);
    var selectedTag = item.parentElement.firstChild.innerText;
    console.log(item.parentElement.firstChild.innerText);
    fetch('info.json')
   .then(res => res.json())
   .then(function(data){
   //console.log(data.length)
   //console.log(document.getElementById("input").value)
    info = data;

    for(var i=0;i<info.length;i++){
        if(selectedTag===info[i].ttag){
            console.log(info[i]);
            document.getElementById("printTitleName").innerText = info[i].name;
            document.getElementById("printSomeSpecs").innerText = info[i].specs.caseSize + ", " + info[i].specs.bandColor + ", " + info[i].specs.case;
            document.getElementById("printCondition").innerText = "Condition: " + info[i].condition;
            document.getElementById("printGrade").innerText = "Grade: " + info[i].grade;
            document.getElementById("printFunctional").innerText = "Functional Description: " + info[i].functional;
            document.getElementById("printFunctionalDes").innerText = info[i].functionalDes;
            document.getElementById("printPhysical").innerText = "Physical Description: " + info[i].physical;
            document.getElementById("printPhysicalDes").innerText = info[i].physicalDes;
            document.getElementById("printBrand").innerText = "Brand: " + info[i].specs.brand;
            document.getElementById("printModel").innerText = "Model: " + info[i].specs.model;
            document.getElementById("printSeries").innerText = "Series: " + info[i].specs.series;
            document.getElementById("printOS").innerText = "Operating System: " + info[i].specs.os;
        }
    }
    });


    //var string = document.getElementById("printTagNum");
    //string.innerText = "Clicked on " + item.innerText;

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    //var btn = document.getElementById("clickableTag");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    item.ondblclick = function() {
    modal.style.display = "block";
    item.parentElement.style.background = "#121214";
    document.getElementById("dataTableBody").style.overflow = "hidden"; // hide scroll
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    item.parentElement.style.background = "";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        item.parentElement.style.background = "";
        document.getElementById("dataTableBody").style.overflow = ""; // hide scroll
    }
    }
}

function disableSearchBar(){
    var searchBar = document.getElementById("input");
    searchBar.disabled = true
    searchBar.placeholder = "Disabled";
    const clearIcon = document.querySelector(".clear-icon");
    clearIcon.style.visibility = "hidden";
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
    
function load_home() {
    document.getElementById("tester").innerHTML='<object type="text/html" data="index.html" ></object>';
}

// Loads Data Page
function gotoDataPage(item){
    highlightSideMenu(item);
    document.getElementById("dataPage").style.display = "block";
    document.getElementById("searchPage").style.display = "none";
    document.querySelector(".search-container").style.display = "none";
    document.getElementById("tagSheet").style.display="none";
}

// Loads Search Page
function gotoSearchPage(item){
    highlightSideMenu(item);
    document.getElementById("searchPage").style.display = "block";
    document.querySelector(".search-container").style.display = "block";
    document.getElementById("dataPage").style.display = "none";
    document.getElementById("tagSheet").display="none";
}

// Loads Something1 Page
function gotoSomething1(item){
    highlightSideMenu(item);
    document.getElementById("searchPage").style.display = "none";
    document.querySelector(".search-container").style.display = "none";
    document.getElementById("dataPage").style.display = "none";
    document.getElementById("tagSheet").display="none";
}

//Loads Something2 Page
function gotoSomething2(item){
    highlightSideMenu(item);
    document.getElementById("searchPage").style.display = "none";
    document.querySelector(".search-container").style.display = "none";
    document.getElementById("dataPage").style.display = "none";
    document.getElementById("tagSheet").display="none";
}

function highlightSideMenu(item){
    //currently 4 
    for (var i=0; i<4;i++){
        document.getElementById("sideNav"+i).style.background = "";
        document.getElementById("sideNav"+i).parentNode.style.borderLeft = "";
    }
    //sideNav that is selected
    item.style.background = "rgba(255, 0, 0, 0.2)";
    item.parentNode.style.borderLeft = "15px solid rgba(255,0,0)";
}

// Load Tag Sheet
function tagSheet(item){
    console.log(item);
    console.log(document.getElementById("searchPage"));
    console.log(document.getElementById("tagSheet"));
    document.querySelector(".search-container").style.display = "none";
    document.getElementById("searchPage").style.display = "none";
    document.getElementById("tagSheet").style.display = "block";
}

/*.then((res) => {
 const data = res.data;
 console.log(res.Object.value(data))
 // do the rest here
});*/