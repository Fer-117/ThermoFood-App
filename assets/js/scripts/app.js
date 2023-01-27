var dislikeBtn = document.querySelector("#dislike");
var statusEl = document.getElementById("cityAndTemperature");
var ingredientsBtn = document.getElementById("ingredients");
var instructionsBtn = document.getElementById("instructions");
var ingrCloseModal = document.querySelector("#ingrCloseModal");
var insCloseModal = document.querySelector("#insCloseModal");
var ingredientsList = document.getElementById("ingredientsList");
var instructionsList = document.getElementById("instructionsList");
var likeBtn = document.getElementById("like");
var urRecipies = document.getElementById("urRecipies");
var back2App = document.getElementById("back2App");
var mainImageEL = document.getElementById("mainImage");
var storageBtns = document.getElementById("storageBtns");
var resetBtn = document.getElementById("reset");
var nextBtn = document.getElementById("next");
var prevBtn = document.getElementById("prev")
var noStorageBtn = document.getElementsByClassName("noReceipes");
var sideTitles = document.getElementsByClassName("sideTitles");
var dishIndex = 0;

var storeAdditonalData = [];
var storeIng = [];
var storeIns = [];
var contexts = [];

function removeValue(value, index, arr) {
  if (value == "n/a//") {
    arr.splice(index, 1);
    return true;
  }
  return false;
}

function backToMain() {
  storageBtns.classList.toggle("hidden");
  likeBtn.classList.toggle("hidden");
  dislikeBtn.classList.toggle("hidden");
  back2App.classList.toggle("hidden");
  urRecipies.classList.toggle("hidden");
  getLocation();
}

function noFoodSaved() {
  var dishName = document.getElementById("dishName");
  var cals = document.getElementById("calories");
  var proteins = document.getElementById("proteins");
  var fats = document.getElementById("fat");
  var carbs = document.getElementById("carbs");
  var additionalInformation = document.getElementById("additionalInformation");
  noStorageBtn[0].classList.toggle("hidden");
  noStorageBtn[1].classList.toggle("hidden");
  noStorageBtn[2].classList.toggle("hidden");
  mainImageEL.setAttribute("src", "assets/images/noFood.png");
  sideTitles[0].classList.toggle("hidden");
  sideTitles[1].classList.toggle("hidden");
  dishName.classList.toggle("hidden");
  cals.classList.toggle("hidden");
  proteins.classList.toggle("hidden");
  fats.classList.toggle("hidden");
  carbs.classList.toggle("hidden");
  additionalInformation.classList.toggle("hidden");
}

function resetStorage() {
  noFoodSaved();
  storeAdditonalData = [];
  storeIng = [];
  storeIns = [];
  contexts = [];
  localStorage.clear();
}

function previousReceipe() {
  var clean;
  var dishObjs = localStorage.getItem("fullObj");
  var insObjs = localStorage.getItem("instructions");
  var ingObjs = localStorage.getItem("ingredients");
  var addObjs = localStorage.getItem("additional");
  console.log(dishObjs.split(" || ").length);

  dishIndex--;
  if (dishIndex < 0) {
    dishIndex = addObjs.split(" || ").length - 1;
  }
  if (dishObjs.split(" || ")[dishIndex][0] == ",") {
    console.log("Starts with ,");
    clean = dishObjs.split(" || ")[dishIndex].substring(1);
    console.log(JSON.parse(clean));
  } else {
    clean = dishObjs.split(" || ")[dishIndex];
    console.log(JSON.parse(clean));
  }
  console.log(addObjs.split(" || ")[dishIndex]);
  console.log(ingObjs.split(" || ")[dishIndex]);
  console.log(insObjs.split(" || ")[dishIndex]);
  mainImageEL.setAttribute("src", JSON.parse(clean).thumbnail_url);
  var dishName = document.getElementById("dishName");
  var cals = document.getElementById("calories");
  var proteins = document.getElementById("proteins");
  var fats = document.getElementById("fat");
  var carbs = document.getElementById("carbs");
  var additionalInformation = document.getElementById("additionalInformation");
  dishName.innerHTML = "<b>Name: </b>" + JSON.parse(clean).name;
  cals.innerHTML =
    "<b>Calories: </b>" + JSON.parse(clean).nutrition.calories + "kcals 🔥";
  proteins.innerHTML =
    "<b>Proteins: </b>" + JSON.parse(clean).nutrition.protein + " g 🥩";
  fats.innerHTML = "<b>Fats: </b>" + JSON.parse(clean).nutrition.fat + " g 🥑";
  carbs.innerHTML =
    "<b>Carbohydrates: </b>" +
    JSON.parse(clean).nutrition.carbohydrates +
    " g 🥔";

  if (addObjs.split(" || ")[dishIndex][0] == ",") {
    console.log(addObjs.split(" || ")[dishIndex], "Starts with ,");
    var extraInfo = addObjs.split(" || ")[dishIndex].substring(1);
    console.log(addObjs.split(" || ")[dishIndex][0]);
    console.log(extraInfo);
    additionalInformation.innerHTML = extraInfo;
  } else {
    additionalInformation.innerHTML = addObjs.split(" || ")[dishIndex];
  }

  ingredientsList.innerHTML = "";

  for (var ingredient of ingObjs.split(" || ")[dishIndex].split("//")) {
    var listItem = document.createElement("li");
    if (ingredient[0] == ",") {
      console.log(ingredient, "Starts with ,");
      ingredient = ingredient.substring(1);
    }

    if (ingredient === "") {
      continue;
    }

    listItem.classList.add("flex");
    listItem.classList.add("items-start");
    listItem.innerHTML = `<div class="flex-shrink-0"> <svg class="h-6 w-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"           viewBox="0 0 24 24"           stroke-width="1.5"           stroke="currentColor"           aria-hidden="true"         >           <path             stroke-linecap="round"             stroke-linejoin="round"             d="M4.5 12.75l6 6 9-13.5"           />         </svg>       </div>       <p class="ml-3 text-base font-medium text-gray-500">         ${ingredient}.       </p>`;
    ingredientsList.append(listItem);
  }
  console.log(insObjs.split(" || ")[dishIndex].split("."));
  instructionsList.innerHTML = "";
  for (var instruction of insObjs.split(" || ")[dishIndex].split(".")) {
    var listItem = document.createElement("li");
    if (instruction[0] == ",") {
      console.log(instruction, "Starts with ,");
      instruction = instruction.substring(1);
    }
    listItem.classList.add("flex");
    listItem.classList.add("items-start");
    listItem.innerHTML = `<div class="flex-shrink-0"> <svg class="h-6 w-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"           viewBox="0 0 24 24"           stroke-width="1.5"           stroke="currentColor"           aria-hidden="true"         >           <path             stroke-linecap="round"             stroke-linejoin="round"             d="M4.5 12.75l6 6 9-13.5"           />         </svg>       </div>       <p class="ml-3 text-base font-medium text-gray-500">         ${instruction}.       </p>`;
    instructionsList.append(listItem);
  }
}

function nextReceipe() {
  var clean;
  var dishObjs = localStorage.getItem("fullObj");
  var insObjs = localStorage.getItem("instructions");
  var ingObjs = localStorage.getItem("ingredients");
  var addObjs = localStorage.getItem("additional");
  console.log(dishObjs.split(" || ").length);

  dishIndex++;
  if (dishIndex === addObjs.split(" || ").length - 1) {
    dishIndex = 0;
  }
  if (dishObjs.split(" || ")[dishIndex][0] == ",") {
    console.log("Starts with ,");
    clean = dishObjs.split(" || ")[dishIndex].substring(1);
    console.log(JSON.parse(clean));
  } else {
    clean = dishObjs.split(" || ")[dishIndex];
    console.log(JSON.parse(clean));
  }
  console.log(addObjs.split(" || ")[dishIndex]);
  console.log(ingObjs.split(" || ")[dishIndex]);
  console.log(insObjs.split(" || ")[dishIndex]);
  mainImageEL.setAttribute("src", JSON.parse(clean).thumbnail_url);
  var dishName = document.getElementById("dishName");
  var cals = document.getElementById("calories");
  var proteins = document.getElementById("proteins");
  var fats = document.getElementById("fat");
  var carbs = document.getElementById("carbs");
  var additionalInformation = document.getElementById("additionalInformation");
  dishName.innerHTML = "<b>Name: </b>" + JSON.parse(clean).name;
  cals.innerHTML =
    "<b>Calories: </b>" + JSON.parse(clean).nutrition.calories + "kcals 🔥";
  proteins.innerHTML =
    "<b>Proteins: </b>" + JSON.parse(clean).nutrition.protein + " g 🥩";
  fats.innerHTML = "<b>Fats: </b>" + JSON.parse(clean).nutrition.fat + " g 🥑";
  carbs.innerHTML =
    "<b>Carbohydrates: </b>" +
    JSON.parse(clean).nutrition.carbohydrates +
    " g 🥔";

  if (addObjs.split(" || ")[dishIndex][0] == ",") {
    console.log(addObjs.split(" || ")[dishIndex], "Starts with ,");
    var extraInfo = addObjs.split(" || ")[dishIndex].substring(1);
    console.log(addObjs.split(" || ")[dishIndex][0]);
    console.log(extraInfo);
    additionalInformation.innerHTML = extraInfo;
  } else {
    additionalInformation.innerHTML = addObjs.split(" || ")[dishIndex];
  }

  ingredientsList.innerHTML = "";

  for (var ingredient of ingObjs.split(" || ")[dishIndex].split("//")) {
    var listItem = document.createElement("li");
    if (ingredient[0] == ",") {
      console.log(ingredient, "Starts with ,");
      ingredient = ingredient.substring(1);
    }

    if (ingredient === "") {
      continue;
    }

    listItem.classList.add("flex");
    listItem.classList.add("items-start");
    listItem.innerHTML = `<div class="flex-shrink-0"> <svg class="h-6 w-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"           viewBox="0 0 24 24"           stroke-width="1.5"           stroke="currentColor"           aria-hidden="true"         >           <path             stroke-linecap="round"             stroke-linejoin="round"             d="M4.5 12.75l6 6 9-13.5"           />         </svg>       </div>       <p class="ml-3 text-base font-medium text-gray-500">         ${ingredient}.       </p>`;
    ingredientsList.append(listItem);
  }
  console.log(insObjs.split(" || ")[dishIndex].split("."));
  instructionsList.innerHTML = "";
  for (var instruction of insObjs.split(" || ")[dishIndex].split(".")) {
    var listItem = document.createElement("li");
    if (instruction[0] == ",") {
      console.log(instruction, "Starts with ,");
      instruction = instruction.substring(1);
    }
    listItem.classList.add("flex");
    listItem.classList.add("items-start");
    listItem.innerHTML = `<div class="flex-shrink-0"> <svg class="h-6 w-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"           viewBox="0 0 24 24"           stroke-width="1.5"           stroke="currentColor"           aria-hidden="true"         >           <path             stroke-linecap="round"             stroke-linejoin="round"             d="M4.5 12.75l6 6 9-13.5"           />         </svg>       </div>       <p class="ml-3 text-base font-medium text-gray-500">         ${instruction}.       </p>`;
    instructionsList.append(listItem);
  }
}

function showFavorites() {
  if (!localStorage.getItem("fullObj")) {
    noFoodSaved();
    storageBtns.classList.toggle("hidden");
    likeBtn.classList.toggle("hidden");
    dislikeBtn.classList.toggle("hidden");
    back2App.classList.toggle("hidden");
    urRecipies.classList.toggle("hidden");
  } else {
    storageBtns.classList.toggle("hidden");
    likeBtn.classList.toggle("hidden");
    dislikeBtn.classList.toggle("hidden");
    back2App.classList.toggle("hidden");
    urRecipies.classList.toggle("hidden");
    var dishObjs = localStorage.getItem("fullObj");
    var insObjs = localStorage.getItem("instructions");
    var ingObjs = localStorage.getItem("ingredients");
    var addObjs = localStorage.getItem("additional");
    console.log(dishObjs.split(" || ").length);
    console.log(insObjs.split(" || ").length);
    mainImageEL.setAttribute(
      "src",
      JSON.parse(dishObjs.split(" || ")[0]).thumbnail_url
    );
    var dishName = document.getElementById("dishName");
    var cals = document.getElementById("calories");
    var proteins = document.getElementById("proteins");
    var fats = document.getElementById("fat");
    var carbs = document.getElementById("carbs");
    var additionalInformation = document.getElementById(
      "additionalInformation"
    );
    dishName.innerHTML =
      "<b>Name: </b>" + JSON.parse(dishObjs.split(" || ")[0]).name;
    cals.innerHTML =
      "<b>Calories: </b>" +
      JSON.parse(dishObjs.split(" || ")[0]).nutrition.calories +
      "kcals 🔥";
    proteins.innerHTML =
      "<b>Proteins: </b>" +
      JSON.parse(dishObjs.split(" || ")[0]).nutrition.protein +
      " g 🥩";
    fats.innerHTML =
      "<b>Fats: </b>" +
      JSON.parse(dishObjs.split(" || ")[0]).nutrition.fat +
      " g 🥑";
    carbs.innerHTML =
      "<b>Carbohydrates: </b>" +
      JSON.parse(dishObjs.split(" || ")[0]).nutrition.carbohydrates +
      " g 🥔";

    if (addObjs.split(" || ")[0][0] == ",") {
      console.log(addObjs.split(" || ")[0][0], "Starts with ,");
      var extraInfo = addObjs.split(" || ")[0].substring(1);
      additionalInformation.innerHTML = extraInfo;
    } else {
      additionalInformation.innerHTML = addObjs.split(" || ")[0];
    }
    ingredientsList.innerHTML = "";
    console.log(ingObjs.split(" || ")[dishIndex]);
    for (var ingredient of ingObjs.split(" || ")[dishIndex].split("//")) {
      var listItem = document.createElement("li");
      if (ingredient[0] == ",") {
        console.log(ingredient, "Starts with ,");
        ingredient = ingredient.substring(1);
      }

      if (ingredient === "") {
        continue;
      }

      listItem.classList.add("flex");
      listItem.classList.add("items-start");
      listItem.innerHTML = `<div class="flex-shrink-0"> <svg class="h-6 w-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"           viewBox="0 0 24 24"           stroke-width="1.5"           stroke="currentColor"           aria-hidden="true"         >           <path             stroke-linecap="round"             stroke-linejoin="round"             d="M4.5 12.75l6 6 9-13.5"           />         </svg>       </div>       <p class="ml-3 text-base font-medium text-gray-500">         ${ingredient}.       </p>`;
      ingredientsList.append(listItem);
    }

    console.log(insObjs.split(" || ")[0].split("."));
    instructionsList.innerHTML = "";
    for (var instruction of insObjs.split(" || ")[0].split(".")) {

      var listItem = document.createElement("li");
      if (instruction[0] == ",") {
        instruction = instruction.substring(1);
      }
      listItem.classList.add("flex");
      listItem.classList.add("items-start");
      listItem.innerHTML = `<div class="flex-shrink-0"> <svg class="h-6 w-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"           viewBox="0 0 24 24"           stroke-width="1.5"           stroke="currentColor"           aria-hidden="true"         >           <path             stroke-linecap="round"             stroke-linejoin="round"             d="M4.5 12.75l6 6 9-13.5"           />         </svg>       </div>       <p class="ml-3 text-base font-medium text-gray-500">         ${instruction}.       </p>`;
      instructionsList.append(listItem);
    }
  }
}

function savingRecipie(context, ingredients, instructions) {
  if (localStorage.getItem("fullObj")) {
    storeAdditonalData = [];
    storeIng = [];
    storeIns = [];
    contexts = [];
    console.log("Storage has something");
    storeAdditonalData.push(localStorage.getItem("additional"));
    storeIng.push(localStorage.getItem("ingredients"));
    storeIns.push(localStorage.getItem("instructions"));
    contexts.push(localStorage.getItem("fullObj"));
  }

  var mainDish = JSON.stringify(context);
  contexts.push(mainDish + " || ");
  var dishArr = [...new Set(contexts)];
  // dishArr = JSON.stringify(dishArr)
  if (!context.original_video_url) {
    if (!context.description) {
      storeAdditonalData.push(
        "There's no video nor description available for this dish, sorry for the trouble. Have a fun cooking while using ThermoFood App. || "
      );
    } else {
      storeAdditonalData.push(context.description + " || ");
    }
  } else {
    var ifVideo = `<video class="z-10 h-60 w-60 rounded shadow" controls>
    <source src="${context.original_video_url}" type="video/mp4">
    <source src="${context.original_video_url}" type="video/ogg">
  </video> || `;
    storeAdditonalData.push(ifVideo);
  }

  storeIng.push(ingredients + " || ");
  storeIns.push(instructions + " || ");
  insArr = [...new Set(storeIns)];
  ingArr = [...new Set(storeIng)];
  extraArr = [...new Set(storeAdditonalData)];
  localStorage.setItem("fullObj", dishArr);
  localStorage.setItem("instructions", insArr);
  localStorage.setItem("ingredients", ingArr);
  localStorage.setItem("additional", extraArr);
}

function gettingDishes(dishes) {
  var ingredients = [];
  var instructions = [];
  {
    var dishesIndex = Math.floor(Math.random() * dishes.length);
    var tag = dishes[dishesIndex];

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "265686aa14mshebe5bed7a41cef2p1b9d66jsnfe7d3bc16121",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    fetch(
      `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=${tag}`,
      //"https://tasty.p.rapidapi.com/tags/list",
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var index = Math.floor(Math.random() * data.results.length);
        console.log(index);
        console.log(data.results);
        if (data.results.length === 0) {
          getLocation();
        }
        console.log(data.results[index].description);
        while (
          data.results[index].nutrition === undefined ||
          data.results[index].nutrition.calories === undefined
        ) {
          index = Math.floor(Math.random() * data.results.length);
        }

        for (var i = 0; i < data.results[index].sections.length; i++) {
          for (
            var j = 0;
            j < data.results[index].sections[i].components.length;
            j++
          ) {
            ingredients.push(
              data.results[index].sections[i].components[j].raw_text + "//"
            );
          }
        }

        for (var i = 0; i < data.results[index].instructions.length; i++) {
          instructions.push(data.results[index].instructions[i].display_text);
        }

        mainImageEL.setAttribute("src", data.results[index].thumbnail_url);
        var dishName = document.getElementById("dishName");
        var cals = document.getElementById("calories");
        var proteins = document.getElementById("proteins");
        var fats = document.getElementById("fat");
        var carbs = document.getElementById("carbs");
        var additionalInformation = document.getElementById(
          "additionalInformation"
        );
        noStorageBtn[0].classList.add("hidden");
        noStorageBtn[1].classList.add("hidden");
        noStorageBtn[2].classList.add("hidden");
        sideTitles[0].classList.remove("hidden");
        sideTitles[1].classList.remove("hidden");
        dishName.classList.remove("hidden");
        cals.classList.remove("hidden");
        proteins.classList.remove("hidden");
        fats.classList.remove("hidden");
        carbs.classList.remove("hidden");
        additionalInformation.classList.remove("hidden");

        dishName.innerHTML = "<b>Name: </b>" + data.results[index].name;
        cals.innerHTML =
          "<b>Calories: </b>" +
          data.results[index].nutrition.calories +
          "kcals 🔥";
        proteins.innerHTML =
          "<b>Proteins: </b>" + data.results[index].nutrition.protein + " g 🥩";
        fats.innerHTML =
          "<b>Fats: </b>" + data.results[index].nutrition.fat + " g 🥑";
        carbs.innerHTML =
          "<b>Carbohydrates: </b>" +
          data.results[index].nutrition.carbohydrates +
          " g 🥔";
        if (!data.results[index].original_video_url) {
          if (!data.results[index].description) {
            additionalInformation.innerHTML =
              "There's no video nor description available for this dish, sorry for the trouble. Have a fun cooking while using ThermoFood App.";
          } else {
            additionalInformation.innerHTML = data.results[index].description;
          }
        } else {
          console.log(data.results[index].original_video_url);
          additionalInformation.innerHTML = `<video class="z-10 h-60 w-60 rounded shadow" controls>
          <source src="${data.results[index].original_video_url}" type="video/mp4">
          <source src="${data.results[index].original_video_url}" type="video/ogg">
        </video>`;
        }

        console.log(data.results[index].name);
        ingredients.filter(removeValue);
        ingredientsList.innerHTML = "";
        for (var ingredient of ingredients) {
          var listItem = document.createElement("li");
          ingredient = ingredient.replace("//", ".");
          listItem.classList.add("flex");
          listItem.classList.add("items-start");
          listItem.innerHTML = `<div class="flex-shrink-0"> <svg class="h-6 w-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"           viewBox="0 0 24 24"           stroke-width="1.5"           stroke="currentColor"           aria-hidden="true"         >           <path             stroke-linecap="round"             stroke-linejoin="round"             d="M4.5 12.75l6 6 9-13.5"           />         </svg>       </div>       <p class="ml-3 text-base font-medium text-gray-500">         ${ingredient}       </p>`;
          ingredientsList.append(listItem);
        }

        instructions.filter(removeValue);
        instructionsList.innerHTML = "";
        for (var instruction of instructions) {
          var listItem = document.createElement("li");
          listItem.classList.add("flex");
          listItem.classList.add("items-start");
          listItem.innerHTML = `<div class="flex-shrink-0"> <svg class="h-6 w-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"           viewBox="0 0 24 24"           stroke-width="1.5"           stroke="currentColor"           aria-hidden="true"         >           <path             stroke-linecap="round"             stroke-linejoin="round"             d="M4.5 12.75l6 6 9-13.5"           />         </svg>       </div>       <p class="ml-3 text-base font-medium text-gray-500">         ${instruction}       </p>`;
          instructionsList.append(listItem);
        }
        var context = data.results[index];
        console.log(context);
        likeBtn.addEventListener(
          "click",
          function (event) {
            savingRecipie(context, ingredients, instructions);
            event.preventDefault();
          },
          false
        );
      });
  }
}

function showIngredientsHandler() {
  var ingModal = document.getElementById("ingredientsModal");
  ingModal.classList.toggle("hidden");
}

function showInstructionsHandler() {
  var insModal = document.getElementById("instructionsModal");
  insModal.classList.toggle("hidden");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getApi, denyLocation);
  } else {
    dummyText.innerHTML = "This app requires Geolocation to function";
  }
}

function denyLocation() {
  var today = dayjs();
  var hour = today.format("HH");
  statusEl.innerHTML = today.format("DD-MMM-YYYY  hh:mm:ss A");
  if (hour >= 4 && hour <= 12) {
    var dishes = breakFasts;
  } else if (hour >= 12 && hour <= 21) {
    var dishes = lunch;
  } else {
    var dishes = dinner;
  }
  gettingDishes(dishes);
}

//TODO improvement proposal: ask manual weather or location if user denies location on device

function getApi(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log(latitude, longitude);
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.city.name);
      console.log(data.list[0].main.temp);
      var temperature = parseFloat(data.list[0].main.temp);
      var city = data.city.name;
      var country = data.city.country;
      if (temperature > 20) {
        var emoji = "☀️";
      } else {
        var emoji = "🥶";
      }
      statusEl.innerHTML =
        city + ", " + country + " | " + temperature + " C° " + emoji;
      getFood(temperature, city);
    });
}

function getFood(temperature, city) {
  if (temperature < 10) {
    var dishes = coldDays;
  } else if (temperature >= 10 && temperature < 25) {
    var dishes = coolDays;
  } else if (temperature >= 25 && temperature < 35) {
    var dishes = warmDays;
  } else {
    var dishes = hotDays;
  }
  gettingDishes(dishes);
}
getLocation();
dislikeBtn.addEventListener("click", getLocation);
ingredientsBtn.addEventListener("click", showIngredientsHandler);
instructionsBtn.addEventListener("click", showInstructionsHandler);
ingrCloseModal.addEventListener("click", showIngredientsHandler);
insCloseModal.addEventListener("click", showInstructionsHandler);
urRecipies.addEventListener("click", showFavorites);
back2App.addEventListener("click", backToMain);
resetBtn.addEventListener("click", resetStorage);
nextBtn.addEventListener("click", nextReceipe);
prevBtn.addEventListener("click", previousReceipe)
