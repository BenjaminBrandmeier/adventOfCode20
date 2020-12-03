interface Position {
    x: number
    y: number
}

const isTree = (s: string) => s === '#';

let slope = await readInput();

console.log("resultA: ", countTreesWhileRiding(slope, 3, 1));
console.log("resultB: ",
    [{x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 7, y: 1}, {x: 1, y: 2}]
        .map(movement => countTreesWhileRiding(slope, movement.x, movement.y))
        .reduce((a, b) => a * b))

function countTreesWhileRiding(slope: string[], moveX: number, moveY: number) {
    const maxX = slope[0].length;
    let numOfTreesPassedBy = 0;
    let position: Position = {x: 0, y: 0};

    while (position.y < slope.length) {
        if (isTree(slope[position.y].charAt(position.x))) {
            numOfTreesPassedBy++;
        }
        position = ride(position, moveX, moveY, maxX);
    }
    return numOfTreesPassedBy;
}

function ride(position: Position, moveX: number, moveY: number, maxX: number): Position {
    position.x = (position.x + moveX) % maxX;
    position.y = position.y + moveY;
    return position;
}

async function readInput(): Promise<string[]> {
    const inputAsString = await Deno.readTextFile('input.txt');
    return inputAsString.split(/\n/g);
}