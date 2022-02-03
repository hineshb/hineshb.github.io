window.onload=function(){
    showBalance();
    const clearIcon = document.querySelector(".clear-icon");
    const betBar = document.querySelector(".betinput");
    const dollar = document.querySelector(".betinput-icon");

    betBar.addEventListener("keyup", () => {
    if(betBar.value && clearIcon.style.visibility != "visible"){
        clearIcon.style.visibility = "visible";
        dollar.style.visibility = "visible";
    } else if(!betBar.value) {
        clearIcon.style.visibility = "hidden";
        dollar.style.visibility = "hidden";
    }
    });

    clearIcon.addEventListener("click", () => {
        betBar.value = "";
    clearIcon.style.visibility = "hidden";
    dollar.style.visibility = "hidden";
    })

    betBar.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            var modal = document.getElementById("myModal");
            if(document.getElementById("restartbtn").style.display){
                modal.style.display = "none";
                document.getElementById("betStatus").style.display = "none";
                restartBlackJack();
            }else{
                modal.style.display = "none";
                document.getElementById("betStatus").style.display = "none";
                startBlackJack();
            }
            console.log("help")
        }
    });

}