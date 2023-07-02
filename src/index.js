// Create an object to store the selected cities and their respective timezones
let selectedCities = {};
let cardCounter = 0;
let firstSelectionMade = false; //initial state to understand when to reset the list of cities .

function generateCardId() {
  return `city-card-${cardCounter++}`;
}

function updateCard(timezone) {
  if (timezone === "current") {
    timezone = moment.tz.guess(); //guess the user location
  }
  let cityName = timezone.replace("_", " ").split("/")[1];
  let cardDate = moment().tz(timezone).format("dddd Do MMM");
  let cardTime = moment().tz(timezone).format("h:mm:ss");
  let cardMeridiem = moment().tz(timezone).format("A");

  // Check if the city already exists in the selectedCities object
  let cityCardId = Object.keys(selectedCities).find(
    (key) => selectedCities[key] === timezone
  );

  if (!cityCardId) {
    // Generate a unique ID for the city card to later store the timezone forbidden characters
    cityCardId = generateCardId();

    let cardId = document.querySelector("#cities");
    cardId.innerHTML += `
      <div id="${cityCardId}" class="city-card d-flex justify-content-between">
        <div class="col-auto">
          <h2>${cityName}</h2>
          <div class="date">${cardDate}</div>
        </div>
        <div class="col-auto time">
          <span class="card-time">${cardTime}</span> <span class="meridiem">${cardMeridiem}</span>
        </div>
      </div>
    `;

    // Add the city and its timezone to the selectedCities object to make setInterval work
    // because id and class cannot have / nor _
    selectedCities[cityCardId] = timezone;
  } else {
    // Update the date and time for existing city card
    let cityCard = document.querySelector(`#${cityCardId}`);
    let cardDateElement = cityCard.querySelector(".date");
    let cardTimeElement = cityCard.querySelector(".card-time");
    cardDateElement.textContent = cardDate;
    cardTimeElement.textContent = cardTime;
  }
}

function addCity(event) {
  let cityTimezone = event.target.value;
  if (!firstSelectionMade) {
    // Remove the current HTML for cities if it's the first selection
    let cardId = document.querySelector("#cities");
    cardId.innerHTML = "";
    // Reset the selected cities
    selectedCities = {};
    firstSelectionMade = true;
  }

  updateCard(cityTimezone);
  //select the first choice from the dropdown
  event.target.selectedIndex = 0;
  // Show the back home link from the time we select our first city in the dropdown
  document.querySelector("#backHomeLink").style.display = "block";
}

// Function to update the time for all city cards by looping each city in selectedCities array
function updateTime() {
  Object.values(selectedCities).forEach((timezone) => {
    updateCard(timezone);
  });
}

//default cities showing at Home
updateCard("Europe/London");
updateCard("America/New_York");
updateCard("Asia/Hong_Kong");
// Set interval to update the time every second
setInterval(updateTime, 1000);

let cities = document.querySelector(".form-select");
cities.addEventListener("change", addCity);
