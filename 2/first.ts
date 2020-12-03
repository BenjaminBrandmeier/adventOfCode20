type Entry = {
    minOccurrence: number
    maxOccurrence: number
    letter: string
    password: string
}

const allLines = await parseInput();

const regex = /(\d+)-(\d+) (\w): (.*)/;

const numberOfCorrectPasswords =
    allLines.map(l => {
        const result = l.match(regex);

        return {
            minOccurrence: +result![1],
            maxOccurrence: +result![2],
            letter: result![3],
            password: result![4],
        } as Entry
    }).filter(e => {
        const charOccurrence = e.password.split(e.letter).length - 1;
        return e.minOccurrence <= charOccurrence && charOccurrence <= e.maxOccurrence;
    }).length;

console.log({numberOfCorrectPasswords});


async function parseInput() {
    const inputAsString = await Deno.readTextFile('input.txt');
    return inputAsString.split(/\n/g).map(s => s);
}
