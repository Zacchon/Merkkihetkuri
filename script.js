function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  // Get timezone offset like +0200
  const offset = -date.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
  const sign = offset >= 0 ? '+' : '-';
  
  return `${year}-${month}-${day} ${hours}:${minutes} ${sign}${offsetHours}${offsetMinutes}`;
}

const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const submitInput = document.getElementById("submitInput");
const debugDiv = document.getElementById("DEBUG");

const momentsOfInterest = generateRoundMoments();

submitInput.onclick = function() {
    const date = dateInput.value;
    const time = timeInput.value;
    const event_millis = new Date(`${date} ${time}`).getTime();
    const now_millis = Date.now();

    const delta_millis = now_millis - event_millis;
    
    const partyTimes = nextMoments(delta_millis, 8);

    let tableHTML = `<table class="debugTable">`;
    let tableHeader = `<thead>`
        + `<tr><th>Juhlistettava ajankohta</th><th>Delta millisekunteina</th><th>Delta viikkoina</th></tr>` 
        + `<tr><th>${date} ${time}</th><th>${delta_millis}</th><th>${getWeeks(delta_millis).toFixed(3)}</th></tr>`
        + `<tr style="border-top: 1px solid #aaa;"><th>Seuraavat merkkihetket:</th><th>Delta (ms)</th><th>Juhlan aihe</th></tr>`
        + `</thead>`;
    tableHTML += tableHeader;

    tableHTML += "<tbody>"
    for (const party of partyTimes) {
        tableHTML += "<tr>"
        console.log("HEI?", party)
        const partyDate = new Date(party[0] + event_millis);
        // DEBUG: näytä juhlistettava ajankohta millisekunteineen sekä viikkoineen; lisäksi seuraava kiinnostava ajankohta
        partyDateString = formatDate(partyDate);

        tableHTML += `<td>${partyDateString}</td><td>${party[0]}</td><td>${party[1]}</td>`
        tableHTML += "</tr>";
    }
    tableHTML += "</tbody></table>";
    debugDiv.innerHTML = tableHTML + debugDiv.innerHTML;
};

function nextMoments(millis, n_moments=1) {
    const idx = momentsOfInterest.findIndex((moment) => moment[0] >= millis);
    return momentsOfInterest.slice(idx, idx+n_moments);
//    return momentsOfInterest.find((moment) => moment[0] >= millis);
}

function getWeeks(millis) {
    return millis / (1000 * 3600 * 24 * 7); 
}

function getDays(millis) {
    return millis / (1000 * 3600 * 24);
}

function getHours(millis) {
    return millis / (1000 * 3600);
}

function getMinutes(millis) {
    return millis / (1000 * 60);
}



/*
Numerologically interesting number patterns include consecutive numbers (in any base), e.g.
123456789abcdef; fedcba9876543210

Numbers resembling natural constants are of special interest:
TAU^pow * (roundNumber)
PI^pow * (roundNumber)
e^pow * (roundNumber)
speed of light: 299792458 (units)


*/
// TODO: milloin täytetään kuukausia
// HUOMAA: karkaussekunneista voi olla päänvaivaa, mutta unohdetaan ne ensi alkuun
