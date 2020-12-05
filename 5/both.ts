async function day5() {
    const input = await readInput();
    const seatIds = input.map(s => findRow(s) * 8 + findColumn(s))

    const highestSeatId = seatIds.reduce((a, b) => a > b ? a : b);
    const myId = [...Array(highestSeatId).keys()]
        .filter(id => !seatIds.includes(id))
        .filter((id, idx, array) => isSurroundedSeat(id, array, idx));

    console.log({highestSeatId}, {myId});
}

const findRow = (s: string): number => find(s.substr(0, 7), 0, 127)
const findColumn = (s: string): number => find(s.substr(7, 3), 0, 7)

function find(s: string, min: number, max: number): number {
    let newBoundary = Math.ceil(min + (max - min) / 2);
    min = ['B', 'R'].includes(s.charAt(0)) ? newBoundary : min;
    max = ['F', 'L'].includes(s.charAt(0)) ? newBoundary : max;
    return s.length == 0 ? min : find(s.substr(1), min, max);
}

const isSurroundedSeat = (id: number, seats: number[], idx: number): boolean =>
    Math.abs(id - seats[idx - 1]) != 1 && Math.abs(id - seats[idx + 1]) != 1;

const readInput = async (): Promise<string[]> => (await Deno.readTextFile('input.txt')).split(/\n/);

await day5();