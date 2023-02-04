const wordText = document.querySelector(".word"),
container=document.querySelector(".container"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
popup=document.getElementById("popup");
popupContent=document.querySelector(".popup-content");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        popup.classList.add("open-popup");
        container.style.display="none";
        popupContent.innerText=`Time off! ${correctWord.toUpperCase()} was the correct word`;
        initGame();
        setTimeout(()=>{
            closePopup();
        }, 3000)
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    popup.classList.add("open-popup");
    container.style.display="none";
    if(!userWord) {
        popupContent.innerText="Please enter the word to check!";
        return;
    }
    if(userWord !== correctWord) {
        popupContent.innerText=`Oops! ${userWord} is not a correct word`;
        return;
    }
    popupContent.innerText=`Congrats! ${correctWord.toUpperCase()} is the correct word`;
    initGame();
}

function closePopup(){
    popup.classList.remove("open-popup");
    container.style.display="block";
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);