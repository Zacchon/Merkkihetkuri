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
    
    debugDiv.innerHTML += dateInput.value;
    debugDiv.innerHTML += "  ";
    debugDiv.innerHTML += delta_millis;
    debugDiv.innerHTML += "  ";
    debugDiv.innerHTML += getWeeks(delta_millis);
    debugDiv.innerHTML += "  ";
    debugDiv.innerHTML += nextMoment(delta_millis);
    debugDiv.innerHTML += "<br/>";
};

function nextMoment(millis) {
    return momentsOfInterest.find((moment) => moment[0] >= millis);
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


function generateRoundMoments() {
    roundMoments = [];
    for (let exp=0; exp<15; exp++) {
        candidates = [];
        base = 10;
        magnitude = Math.pow(base, exp);
        for (let n=1; n<=9; n++) {
            candidates.push([n * magnitude, `${n}*${base}^${exp} millisekuntia`]);
            candidates.push([n * 1000 * magnitude, `${n}*${base}^${exp} sekuntia`]);
            candidates.push([n * 1000 * 60 * magnitude, `${n}*${base}^${exp} minuuttia`]);
            candidates.push([n * 1000 * 60 * 60 * magnitude, `${n}*${base}^${exp} tuntia`]);
            candidates.push([n * 1000 * 60 * 60 * 24 * magnitude, `${n}*${base}^${exp} vuorokautta`]);
            candidates.push([n * 1000 * 60 * 60 * 24 * 7 * magnitude, `${n}*${base}^${exp} viikkoa`]);
        }

        reasonableNums = candidates.filter((moment) => moment[0] < 1e15)
        roundMoments.push(...reasonableNums);
    }

    function compare(moment1, moment2) {
        return moment1[0] - moment2[0]; 
    }
    return roundMoments.sort(compare);
}


// TODO: milloin täytetään kuukausia
// HUOMAA: karkaussekunneista voi olla päänvaivaa, mutta unohdetaan ne ensi alkuun
