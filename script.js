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
    let tableHeader = `<thead><tr>` + `<th>${date} ${time}</th><th>${delta_millis}</th><th>${getWeeks(delta_millis).toFixed(3)} viikkoa</th>` + `</tr></thead>`;
    tableHTML += tableHeader;

    tableHTML += "<tbody>"
    for (const party of partyTimes) {
        tableHTML += "<tr>"
        console.log("HEI?", party)
        const partyDate = new Date(party[0] + event_millis);
        // DEBUG: näytä juhlistettava ajankohta millisekunteineen sekä viikkoineen; lisäksi seuraava kiinnostava ajankohta
        tableHTML += `<td>${partyDate}</td><td>${party[0]}</td><td>${party[1]}</td>`
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
