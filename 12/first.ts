import {Direction, Instruction, Coordinates} from "./data.ts";

const rotate = (currentDirection: Direction, degrees: number) : Direction => (currentDirection.valueOf() + degrees/90 + 4) % 4;

const moveNormally = (instructions: Instruction[]): number => {
    const ship: Coordinates = {horizontalPos: 0, verticalPos: 0};
    let direction = Direction.EAST;
    instructions.forEach(i => {
        switch (i.action) {
            case 'N': ship.verticalPos += i.value; break;
            case 'S': ship.verticalPos -= i.value; break;
            case 'E': ship.horizontalPos += i.value; break;
            case 'W': ship.horizontalPos -= i.value; break;
            case 'L': direction = rotate(direction, -i.value); break;
            case 'R': direction = rotate(direction, i.value); break;
            case 'F': direction === Direction.NORTH ? ship.verticalPos += i.value
                    : direction === Direction.EAST ? ship.horizontalPos += i.value
                    : direction === Direction.SOUTH ? ship.verticalPos -= i.value
                    : ship.horizontalPos -= i.value
        }
    });
    return Math.abs(ship.verticalPos) + Math.abs(ship.horizontalPos);
};

const instructions: Instruction[] = (await Deno.readTextFile('input.txt')).split(/\n/g).map(l => ({action: l.charAt(0), value: +l.substr(1)}));
console.log('Manhattan distance:', moveNormally(instructions));