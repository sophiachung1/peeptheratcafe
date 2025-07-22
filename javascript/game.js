document.addEventListener("DOMContentLoaded", function () {
const drinks = {
  "Matcha Latte": 0,
  "Strawberry Matcha": 0,
  "Injeolmi Matcha": 0,
  "Blueberry Matcha Latte": 0,
  "Banana Matcha": 0,
  "Hojicha Latte": 0,
  "Einspanner Latte": 0,
  "Black Sesame Latte": 0
};

const drinkImages = {
  "Matcha Latte": "results-img/matcha.jpeg",
  "Strawberry Matcha": "results-img/strawberry.jpeg",
  "Injeolmi Matcha": "results-img/injeolmi.jpeg",
  "Blueberry Matcha Latte": "results-img/bluematcha.jpeg",
  "Banana Matcha": "results-img/banana.jpeg",
  "Hojicha Latte": "results-img/hojicha.jpeg",
  "Einspanner Latte": "results-img/einspanner.jpeg",
  "Black Sesame Latte": "results-img/blacksesame.jpeg"
};

const questions = [
    {
        question:"You enter into a cafe and see rats behind the counter.",
        image:"img/cafe.jpg",
        choices:[
        {text:"Rats?? This seems unhygienic…", drinks: ["Black Sesame Latte", "Matcha Latte", "Einspanner Latte"]},
        {text:"Oh, how cute! I bet they make the best coffee.", drinks: ["Strawberry Matcha", "Blueberry Matcha Latte"]},
        {text:"Well, I guess rats know good food. I'll give it a try", drinks: ["Blueberry Matcha Latte"]},
        {text:"Are they using tiny tools to make my coffee? I need to see this!", drinks: ["Injeolmi Matcha", "Banana Matcha"]},
        ]
    },
     {
        question:"You go up the counter and read the menu. You order...",
        image:"img/menu.jpg",
        choices:[
        {text:"Rat-uccino", drinks: ["Black Sesame Latte", "Einspanner Latte"]},
        {text:"Nutty latte", drinks: ["Injeolmi Matcha", "Hojicha Latte"]},
        {text:"Rat-berry spritz", drinks: ["Blueberry Matcha Latte", "Strawberry Matcha"]},
        {text:"Just a plain ol' esp-rat-sso!", drinks: ["Black Sesame Latte"]},
        ]
    },
    {
        question:"Squeak squeak squeak! Three rats approach you and start taking you somewhere ",
        image:"img/rats.jpg",
        choices:[
        {text:"Yay! A new adventure", drinks: ["Blueberry Matcha Latte", "Strawberry Matcha", "Injeolmi Matcha"]},
        {text:"Are they leading me to a secret cheese vault?", drinks: ["Einspanner Latte", "Blueberry Matcha Latte"]},
        {text:"I hope there are snacks!", drinks: ["Banana Matcha", "Injeolmi Matcha"]},
        {text:"I don't think this is a good idea...", drinks: ["Matcha Latte"]},
        ]
    },
    {
        question:"You are suddenly at a NewRats concert! a NewRats concert! Who is your bias?",
        image:"img/newrats.jpg",
        choices:[
        {text:"Hanni -> Hammi", drinks: ["Strawberry Matcha"]},
        {text:"Danielle -> Scurrielle", drinks: ["Injeolmi Matcha"]},
        {text:"Hyein -> Squeakin", drinks: ["Hojicha Latte"]},
        {text:"Minji -> Whiskji", drinks: ["Matcha Latte"]},
        {text:"Haerin -> Chewrin", drinks: ["Black Sesame Latte"]},
        ]
    },
    {
        question:"Whew, that was a fun concert! What are you replenishing your energy with?",
        image:"img/food.jpg",
        choices:[
        {text:"Whole wheat bread", drinks: ["Matcha Latte"]},
        {text:"Plums", drinks: ["Strawberry Matcha", "Blueberry Matcha Latte"]},
        {text:"Bell pepper", drinks: ["Einspanner Latte", "Black Sesame Latte"]},
        {text:"Sunflower seeds", drinks: ["Banana Matcha"]},
        ]
    },
    {
        question:"You’re hanging out with your new rat friends. What’s the plan for the evening?",
        image:"img/fun.jpg",
        choices:[
        {text:"Escape room maze", drinks: ["Einspanner Latte", "Banana Matcha"]},
        {text:"Watching Ratatouille", drinks: ["Hojicha Latte"]},
        {text:"Cheese wheel heist", drinks: ["Blueberry Matcha Latte", "Einspanner Latte"]},
        {text:"Birdwatching", drinks: ["Banana Matcha", "Matcha Latte"]},
        ]
    },
    {
        question:"The perfect end to the evening is...",
        image:"img/ending.jpg",
        choices:[
        {text:"Snuggled up with the rats and a blanket having a thoughtful conversation", drinks: ["Injeolmi Matcha", "Hojicha Latte"]},
        {text:"Drinks, drinks, and more drinks!", drinks: ["Matcha Latte"]},
        {text:"On the balcony, looking out at the city lights", drinks: ["Strawberry Matcha", "Banana Matcha"]},
        {text:"Curling up with some music and a hot drink", drinks: ["Black Sesame Latte", "Hojicha Latte"]},
        ]
    },
];

let currentQuestionIndex = 0; 

function renderQuestion() {
    const question = questions[currentQuestionIndex]; 
    document.getElementById("story-image").src = question.image;
    document.getElementById("question-text").innerText = question.question;

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";

    question.choices.forEach((choice) => {
        const btn = document.createElement("button");
        btn.innerText = choice.text;
        btn.className = "choices";
        btn.onclick = () => handleAnswer(choice.drinks);
        choicesContainer.appendChild(btn);
    });
}

function handleAnswer(selectedDrinks) {
  selectedDrinks.forEach(drink => {
    drinks[drink] += 1;
  });

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {

    // Hide quiz UI
  document.getElementById("story-image").style.display = "none";
  document.getElementById("question-text").style.display = "none";
  document.getElementById("choices-container").style.display = "none";

  // Determine drink result
  let highestScore = -1;
  let topDrinks = [];
  for (const drink in drinks) {
    if (drinks[drink] > highestScore) {
      highestScore = drinks[drink];
      topDrinks = [drink];
    } else if (drinks[drink] === highestScore) {
      topDrinks.push(drink);
    }
  }
  const finalDrink = topDrinks[Math.floor(Math.random() * topDrinks.length)];
  
  // Display result
  const resultContainer = document.getElementById("quiz-result");
  resultContainer.style.display = "block";
  document.getElementById("result-text").innerText = `Your drink match is: ${finalDrink}`;
  const resultImage = document.getElementById("results-image");
  resultImage.src = drinkImages[finalDrink];
  resultImage.style.display = "block";
}

  function startGame() {
    document.querySelector(".home-image").style.display= "none";
    document.querySelector(".main-text").style.display= "none";
    document.querySelector(".start-button").style.display = "none";
    document.querySelector(".results-image").style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";
    renderQuestion();
  }

  document.querySelector(".start-button").addEventListener("click", startGame);


});