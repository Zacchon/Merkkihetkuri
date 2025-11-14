// Generate an array of round moments in milliseconds as well as the reason for their specialness
function generateRoundMoments(maxBase=24) {
    roundMoments = [];
    for (let base=2; base<=maxBase; base++) {
        expbound = Math.log(1e15) / Math.log(base);
        for (let exp=0; exp<expbound; exp++) {
            candidates = [];
            magnitude = Math.pow(base, exp);
            for (let n=1; n<base; n++) {
                candidates.push([n * magnitude, `${n}*${base}^${exp} millisekuntia`]);
                candidates.push([n * 1000 * magnitude, `${n}*${base}^${exp} sekuntia`]);
                candidates.push([n * 1000 * 60 * magnitude, `${n}*${base}^${exp} minuuttia`]);
                candidates.push([n * 1000 * 60 * 60 * magnitude, `${n}*${base}^${exp} tuntia`]);
                candidates.push([n * 1000 * 60 * 60 * 24 * magnitude, `${n}*${base}^${exp} vuorokautta`]);
                candidates.push([n * 1000 * 60 * 60 * 24 * 7 * magnitude, `${n}*${base}^${exp} viikkoa`]);
            }
    
            reasonableNums = candidates.filter((moment) => moment[0] < 1e15);
            roundMoments.push(...reasonableNums);            
        }
    }

    function compare(moment1, moment2) {
        return moment1[0] - moment2[0]; 
    }
    return roundMoments.sort(compare);
}