let incrementor = 0;


const buttonPressFunc = function () {
    incrementor++;
    console.log("I've been pressed!", incrementor);
};

const keypressPasswordFunc = function () {
    let passwordLength = document.getElementById("typeInMe").value?.length
    let passwordValue = document.getElementById("typeInMe").value

    if (passwordLength < 8) {
        document.getElementById("validation").innerHTML = `<b>Password should be longer than 8 characters</b>`
    } else {
        document.getElementById("validation").innerHTML = ""
    }
    localStorage.setItem("password", passwordValue)
    console.log("The password is: ", passwordLength, " character(s) long");
};


document.getElementById("pressMe")
.addEventListener("click", buttonPressFunc)

document.getElementById("typeInMe")
.addEventListener("keyup", keypressPasswordFunc)