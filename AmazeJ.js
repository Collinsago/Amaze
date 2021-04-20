


//getting the required elements

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

//if Start Quiz is Click
start_btn.onclick = () =>{
    info_box.classList.add("activeInfo"); //show the info box
}

//if Exit Quiz is Click
exit_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //hide the info box
}

//if Continue Quiz is Click
continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(20);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 20;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


//Restart Button
restart_quiz.onclick = () =>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 20;
    let widthValue = 0;
    let userScore = 0;
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
     
}

quit_quiz.onclick = () =>{
    window.location.reload();
}

//if next button is clicked
next_btn.onclick = () =>{
    if(que_count < MCQS.length -1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Question Completed");
        showResultBox();
    }
}

//getting question and optionss from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = `<span>`+ MCQS[index].question +`</span>`;
    let option_tag = `<div class="option">`+ MCQS[index].options[0] +`<span></span></div>`
                      +`<div class="option">`+ MCQS[index].options[1] +`<span></span></div>`
                      +`<div class="option">`+ MCQS[index].options[2] +`<span></span></div>`
                      +`<div class="option">`+ MCQS[index].options[3] +`<span></span></div>`;
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}



// Select Options 

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = MCQS[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        
        console.log("Answer is Correct");
    }else{
        
        console.log("Answer is Incorrect");
    }
    

    //once user select answer disable all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

// show Result 

function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show Result box
    const scoreText = result_box.querySelector(".score_test");
    if(userScore > 3){
        let scoreTag = `<span> Congrats!!! You got <p>`+ userScore +`</p>out of <p>`+ MCQS.length +`</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = `<span> Nice, You got <p>`+ userScore +`</p>out of <p>`+ MCQS.length +`</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = `<span> Sorry, You got only <p>`+ userScore +`</p>out of <p>`+ MCQS.length +`</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    
};


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = MCQS[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    
                }
            }

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}



function startTimerLine(time){
    counterLine = setInterval(timer, 37);
    function timer(){
        time +=1;      
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}


function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = `<span><p>` + index +`</p>Of<p>` + MCQS.length +`</p>Questions</span>`;
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
