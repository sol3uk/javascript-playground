var objectTest;
var objectTest2;
function clickCounter() {
  if(typeof(Storage) !== "undefined") {


    objectTest = {
        hello: "world",
        name: "ben"
    };
    objectTest2 = {
        "hello": "world",
        "name": "ben"
    };
    localStorage.objectTest = objectTest;


    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount)+1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
  }



}
