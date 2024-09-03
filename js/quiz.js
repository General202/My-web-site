let main_screen = document.querySelector(".main-screen")
const start_screen = document.querySelector(".start-screen")
let question = document.querySelector(".question")

let answers = document.querySelector(".answer")
let answer_buttons = document.querySelectorAll(".answer-button")
const start_button = document.querySelector(".start-button")

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) { // Цикл повторюється до тих пір, поки залишаються елементи для перемішування
        randomIndex = Math.floor(Math.random() * currentIndex); // Вибираємо елемент, що залишився.
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [    // Міняємо місцями з поточним елементом.
            array[randomIndex], array[currentIndex]];
    }
    return array; // Повертаємо перемішаний масив
}

function randint(min, max) {
    let number = Math.round(Math.random() * (max - min) + min)
    return number
}

function getrandomSign() {
    let signs = ["+", "-", "*", "/"]
    return signs[randint(0, 3)]
}

class Question {
    constructor() {
        this.a = randint(1, 30)
        this.b = randint(1, 30)
        this.sign = getrandomSign()
        this.question = this.a + this.sign + this.b
        if (this.sign == "+") {
            this.correct = this.a + this.b
        } else if (this.sign == "-") {
            this.correct = this.a - this.b
        } else if (this.sign == "*") {
            this.correct = this.a * this.b
        } else if (this.sign == "/") {
            this.correct = Math.round(this.a / this.b)
        }
        this.answers = [
            this.correct,
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct + 1, this.correct + 15),
        ]

        shuffle(this.answers)
        console.log(this.answers)

    }
    display() {
        question.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

let current_question = new Question()
current_question.display()

let correct_answers_counter = 0
let total_answers_counter = 0

start_button.addEventListener("click", function () {
    start_screen.style.display = "none"
    main_screen.style.display = "flex"
    current_question = new Question()
    current_question.display()
    correct_answers_counter = 0
    total_answers_counter = 0

    setTimeout(function () {
        let accuracy = Math.round(correct_answers_counter * 100 / total_answers_counter)
        let result = document.querySelector(".result")
        result.innerHTML = `Правильно: ${correct_answers_counter}
    Усього: ${total_answers_counter}
    Точність: ${accuracy} %`
        main_screen.style.display = "none"
        start_screen.style.display = "flex"
    }, 5000)
})

answer_buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.innerHTML == current_question.correct) {
            correct_answers_counter += 1
            button.style.background = "#34fa02"
            anime({
                targets: button,
                background: "#ffffff",
                duration: 500,
                delay: 100,
                easing: "linear"
            })
        } else {
            button.style.background = "#e32222"
            anime({
                targets: button,
                background: "#ffffff",
                duration: 500,
                delay: 100,
                easing: "linear"
            })
        }
        total_answers_counter += 1
        current_question = new Question()
        current_question.display()
    })

})