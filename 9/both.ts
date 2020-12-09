function findBrokenNumber(data: number[], preamble = 25): number {
    let lowerBound = 0; let found = false;
    return data.slice(preamble, data.length).find(candidate => {
        for (let a of data.slice(lowerBound, lowerBound + preamble)) {
            for (let b of data.slice(lowerBound, lowerBound + preamble)) {
                if (candidate === a + b) {
                    found = true;
                }
            }
        }
        if (!found) return candidate;
        lowerBound++; found = false;
    })!
}

function findEncryptionWeakness(data: number[], invalidNumber: number) {
    let sumOfContiguousBounds = 0;
    data.forEach((a, idx) => {
        let acc = 0; let min = Number.MAX_VALUE; let max = Number.MIN_VALUE;
        data.slice(idx, data.length).forEach((b) => {
            min = Math.min(min, b); max = Math.max(max, b);
            acc += b;
            if (acc == invalidNumber && b !== invalidNumber) {
                sumOfContiguousBounds = min + max;
            }
        });
    });
    return {sumOfContiguousBounds, invalidNumber};
}

let data: number[] = (await Deno.readTextFile('input.txt')).split(/\n/).map(Number);
console.log(findEncryptionWeakness(data, findBrokenNumber(data, 25)));