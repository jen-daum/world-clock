function updateCard(id, timezone) {
  let cardId = document.querySelector(`#${id}`);
  let cardCity = cardId.querySelector("h2").textContent;
  let cardDate = moment().tz(timezone).format("dddd Do MMM");
  let cardTime = moment().tz(timezone).format("h:mm:ss");
  let cardMeridiem = moment().tz(timezone).format("A");

  cardId.innerHTML = `
        <div class="d-flex justify-content-between">
          <div class="col-auto">
            <h2>${cardCity}</h2>
            <div class="date">${cardDate}</div>
          </div>
          <div class="col-auto time">
            ${cardTime} <span class="meridiem">${cardMeridiem}</span>
          </div>
        </div>
      `;
}

updateCard("marseille", "Europe/Paris");
updateCard("london", "Europe/London");
setInterval(updateCard, 1000, "marseille", "Europe/Paris");
setInterval(updateCard, 1000, "london", "Europe/London");
