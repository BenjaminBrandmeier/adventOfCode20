type Entry = {
    firstPosition: number
    secondPosition: number
    letter: string
    password: string
}

const allLines = await parseInput();

const regex = /(\d+)-(\d+) (\w): (.*)/;

const numberOfCorrectPasswords =
    allLines.map(l => {
        const result = l.match(regex);

        return {
            firstPosition: +result![1],
            secondPosition: +result![2],
            letter: result![3],
            password: result![4],
        } as Entry
    }).filter(e => {
        const firstMatch = e.password[e.firstPosition - 1] === e.letter;
        const secondMatch = e.password[e.secondPosition - 1] === e.letter;
        return (firstMatch || secondMatch) && !(firstMatch && secondMatch);
    }).length;

console.log({numberOfCorrectPasswords});


async function parseInput() {
    const inputAsString = await Deno.readTextFile('input.txt');
    return inputAsString.split(/\n/g).map(s => s);
}
