let selectedCities = [];

function updateCard(timezone) {
  if (timezone === "current") {
    timezone = moment.tz.guess();
  }
  let cityName = timezone.replace("_", " ").split("/")[1];
  let cardDate = moment().tz(timezone).format("dddd Do MMM");
  let cardTime = moment().tz(timezone).format("h:mm:ss");
  let cardMeridiem = moment().tz(timezone).format("A");

  let cardId = document.querySelector("#cities");

  // Check if the city already exists in the selectedCities array
  if (!selectedCities.includes(cityName)) {
    cardId.innerHTML += `
      <div class="city-card d-flex justify-content-between">
        <div class="col-auto">
          <h2>${cityName}</h2>
          <div class="date">${cardDate}</div>
        </div>
        <div class="col-auto time">
          <span class="card-time">${cardTime}</span> <span class="meridiem">${cardMeridiem}</span>
        </div>
      </div>
    `;

    selectedCities.push(cityName);
  }
}

function addCity(event) {
  let timezone = event.target.value;
  updateCard(timezone);
  event.target.selectedIndex = 0; //reselect the first choice in the select form once done.
}

let cities = document.querySelector(".form-select");
cities.addEventListener("change", addCity);

//removed the setInterval for now has it would be looping forever.
/* setInterval(updateCard, 1000, "Europe/Paris");
setInterval(updateCard, 1000, "Europe/London"); */
