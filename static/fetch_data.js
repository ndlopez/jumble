const url ='https://raw.githubusercontent.com/ndlopez/jumble_game/main/static/jumble_words.json';

var jumble_words =[];
const newLocal =[];
var text = "";

/* Parse JSON file generated by Ruby code. 
Output random shuffled words*/
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function getInputValue(correctLetter, inputValue) {
    // Selecting the input element and get its value 
    let thisLetter = document.getElementById(correctLetter);
    // Assign a class to value
    if(inputValue.toUpperCase() === correctLetter){
        thisLetter.classList.remove("wrong");
        thisLetter.classList.add("correct");
        //console.log("Correct",inputVal);
    }else{
        thisLetter.classList.remove("correct");
        thisLetter.classList.add("wrong");
    }
    return thisLetter;
}

fetch(url)
.then((response) => {
	return response.json()
})
.then((jumble_words)=>{
    for (let jdx = 0; jdx < jumble_words.length; jdx++) {
        var jumble_word=jumble_words[jdx];
        jumble_word=jumble_word.toUpperCase();
        text += "<div class='row' id='shufWord'><h2>" + jumble_word.shuffle() + "</h2></div>";
        /* Build as many inputs as the length of a word*/
        text += "<div class='row' id='inputLetters'>";
        for (let idx = 0; idx < jumble_word.length; idx++) {
            text += "<div class='oneLetterCol'><input id='"+ jumble_word[idx]+"' maxlength=1></div>";
        }
        text += "</div>";
        //console.log("inputs",text);
        document.getElementById("jumble_this_word").innerHTML = text;
    }
    for (let idx = 0; idx < jumble_words.length; idx++) {
        for (let letter of jumble_words[idx]){
            letter = letter.toUpperCase();
            let inputVal = document.getElementById(letter);
            inputVal.classList.add("correctAns");
            inputVal.classList.add("wrongAns");
            inputVal.onkeyup = function(){
                var myVal = inputVal.value;
                if (myVal.toUpperCase() === letter){
                    inputVal.classList.remove("wrongAns");}
                else {
                    inputVal.classList.remove("correctAns");
                }
            }
            console.log(letter,inputVal);
        }
    }

    //console.log(jumble_words);
})
.catch((err)=>{
	console.log("Couldnt fetch " + jumble_words + err);
})

console.log(jumble_words);
