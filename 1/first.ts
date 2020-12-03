interface Pair {
    first: number;
    second: number;
}

const allNumbers = await parseInput();

const candidates: Pair[] = allNumbers.map(n => (
    {
        first: n,
        second: 2020 - n
    }))
    .filter(pair => allNumbers.includes(pair.second))

console.log(candidates[0].first * candidates[0].second);


async function parseInput() {
    const inputAsString = await Deno.readTextFile('input.txt');
    return inputAsString.split(/\n/g).map(s => +s);
}
