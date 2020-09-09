//global varaible
var totalCost=0;
//var itemTotalCost=0;
var itemTotalQty=0;


function openNav() {
	var x = document.getElementById("mySidenav");
	if (x.style.width === "300px"){
		document.getElementById("mySidenav").style.width = "0";
		
	} else {
		document.getElementById("mySidenav").style.width = "300px";
	}
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function showHide(d)
{
var onediv = document.getElementById(d);
var divs=['cloth1','cloth2','cloth3','cloth4','cloth5','cloth6','cloth7','cloth8','main','shopcart','contactus','submitShopCart'];
for (var i=0;i<divs.length;i++)
  {
  if (onediv != document.getElementById(divs[i]))
    {
    document.getElementById(divs[i]).style.display='none';
    }
  }
onediv.style.display = 'block';
document.getElementById("mySidenav").style.width = "0";
document.getElementById("main").style.marginLeft= "0";
} 

//highlight selected color
function selector(color){
	console.log(color.id);
	deselector();
	document.getElementById(color.id).style.border = "2px solid pink";
}
//deselect color
function deselector(){
	document.getElementById("spanColor1").style.border = "none";
	document.getElementById("spanColor2").style.border = "none";
	document.getElementById("spanColor3").style.border = "none";
}
//test function
function rneckt(){
	console.log(document.getElementById("rneckQuantity").value);
	console.log(document.getElementById("rneckSize").value);
	//console.log(document.getElementById("spanColor1").style.cssText)
}

//adding to shopping cart
function addToCart(itemQuantity, itemSize, itemPrice, itemColor, imgChangeRneckt){
	// Rneck Values
	var Quantity = itemQuantity.value;
	var Size = itemSize.value
	var Price = itemPrice.textContent.slice(1, 3);
	var Color = itemColor.textContent;
	var Title = imgChangeRneckt.alt;
	//calculate cost and add to total cost
	var itemTotalCost = parseInt(Quantity) * parseInt(Price);
	totalCost += itemTotalCost;
	itemTotalQty += parseInt(Quantity)
	// Total divs already created
	var number = document.getElementById("productq").childElementCount;
    // Container <div> where dynamic content will be placed
    var container = document.getElementById("productq");
    // Clear previous contents of the container
    /*while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }*/
	for (i=0;i<number+1;i++){
	// Create an element
	var p = document.createElement("p");
	var a = document.createElement("a");
	var span = document.createElement("span");
	var cancel = document.createElement("span");
	var div = document.createElement("div");
	//set values and attributes
	//a.href="#";
	if(Quantity=="1"){
		a.innerText= Quantity + " x " + Size + " " + Title + " (" + Color + ")  ";
	}else{
		a.innerText= Quantity + " x " + Size + " " + Title + "s" + " (" + Color + ")  ";
	}
	cancel.classList="cancel";
	cancel.innerText="\xa0" + "(X)";
	cancel.onclick = function() {deleteFromCart(this, itemTotalCost, Quantity);};
	span.classList="price";
	span.innerText="$" + itemTotalCost;
	}
	//add to div and create
	div.appendChild(p);
	div.appendChild(a);
	div.appendChild(span);
	div.appendChild(cancel);
	container.appendChild(div);
	
	//alert to let customer know they inputted
	if(Quantity=="1"){
		alert(Quantity + " x " + Size + " " + Title + " (" + Color + ")" + " has been added to the Cart");
	}else{
		alert(Quantity + " x " + Size + " " + Title + "s" + " (" + Color + ")" + " has been added to the Cart");
	}
	updateCartQty();
}

function updateCartQty(){
	console.log(totalCost);
	console.log("Total items = "+ itemTotalQty);
	document.getElementById("totalCartPrice").innerText= "$" + totalCost;
	document.getElementById("qty").innerText= itemTotalQty;
}

function deleteFromCart(item, price, quantity){
	item.parentElement.style.display='none';
	itemTotalQty = itemTotalQty - quantity;
	totalCost = totalCost - parseInt(price);
	updateCartQty();
}

//CHECK OUT SUBMISSION
var printEmailBody;
var emailTo;
function submitShopCart(){
	console.log("test");
	var node = document.getElementById('productq');
	var totalcost = document.getElementById('totalCartPrice');
	var x = document.forms["customerForm"]["custName"].value;
	var y = document.forms["customerForm"]["custEmail"].value;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	printEmailBody = x + " (" + y + ")" + "<br>" + "<br>" + "Your items: " + "<div>" + "\n" + node.textContent.replaceAll('(X)', '<div>') + "\n" + "Total Cost: " + totalcost.textContent;
	var printEmailBod = printEmailBody.toString();
	//y = customers + invoicer (changed to myself for display)
	emailTo = y + ', hineshb@live.ca';
	
	if(totalcost.textContent == "$0"){
		alert("Cart is empty.");
		return false;
	}
	if (x == "") {
		alert("Name must be filled out");
		//alert(printEmailBod);
		return false;
	}
	if (y == "") {
		alert("Email must be filled out");
		return false;
	}
	if (!y.match(mailformat)){
		alert("You have entered an invalid email address!");
		document.forms["customerForm"]["custEmail"].focus();
		return false;
	}
	document.getElementById("submitCart").disabled = true;
	document.getElementById("submitCart").textContent = "Sending Please Wait...";
	sendEmail();
	//window.open("submit.html", "_self");
}

function sendEmail(){
	Email.send({
	SecureToken : "5e7b6116-e9bf-4e64-b9a5-bfac7835bd9b",
	To : emailTo,
	From : "sjhcpharmacy123@gmail.com",
	Subject : "Your order confirmation from SJHC Pharmacy",
	Body : printEmailBody
	}).then(
		message => window.open("submit.html", "_self")
	);
}

function testCart(){
	//console.log("test");
	var node = document.getElementById('productq');
	var totalcost = document.getElementById('totalCartPrice');
	var printEmailBody = "Your items: " + "\n" + node.textContent.replaceAll('(X)', '\n') + "\n" + "Total Cost: " + totalcost.textContent;
	console.log(printEmailBody);
}