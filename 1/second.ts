const allNumbers = await parseInput();
const maxIndex = allNumbers.length - 1;

while (true) {
    // very serious code coming up
    let n1 = allNumbers[getRandomIndex(maxIndex)];
    let n2 = allNumbers[getRandomIndex(maxIndex)];
    let n3 = allNumbers[getRandomIndex(maxIndex)];

    if (2020 === (n1 + n2 + n3)) {
        console.log({n1}, {n2}, {n3}, "result", n1 * n2 * n3);
        break;
    }
}

function getRandomIndex(max: number) {
    return Math.floor(Math.random() * max);
}

async function parseInput() {
    const inputAsString = await Deno.readTextFile('input.txt');
    return inputAsString.split(/\n/g).map(s => +s);
}
