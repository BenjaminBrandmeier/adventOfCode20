function day13a(notes: { earliestTime: number; allBuses: number[] }) {
    let time: number = notes.earliestTime;
    let earliestBus = undefined;
    while (!earliestBus) {
        time++;
        earliestBus = notes.allBuses.find(b => Number.isInteger(time / b));
    }
    return earliestBus * (time - notes.earliestTime);
}

const input: string[] = (await Deno.readTextFile('input.txt')).split(/\n/);
const notes = {earliestTime: +input[0], allBuses: input[1].split(',').filter(b => b !== 'x').map(Number)};

console.log("Answer:", day13a(notes));