window.onload=function(){
    const clearIcon = document.querySelector(".clear-icon");
    const searchBar = document.querySelector(".search");

    searchBar.addEventListener("keyup", () => {
    if(searchBar.value && clearIcon.style.visibility != "visible"){
        clearIcon.style.visibility = "visible";
    } else if(!searchBar.value) {
        clearIcon.style.visibility = "hidden";
    }
    });

    clearIcon.addEventListener("click", () => {
    searchBar.value = "";
    clearIcon.style.visibility = "hidden";
    })

    searchBar.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            search();
            console.log("help")
        }
    });

}