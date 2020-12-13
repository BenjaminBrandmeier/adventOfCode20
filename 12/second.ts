import {Instruction, Coordinates} from "./data.ts";

const rotateLeft = (waypoint: Coordinates, degree: number): Coordinates => (degree == 0) ? waypoint : rotateLeft({horizontalPos: -waypoint.verticalPos, verticalPos: waypoint.horizontalPos}, degree - 90);
const rotateRight = (waypoint: Coordinates, degree: number): Coordinates => (degree == 0) ? waypoint : rotateRight({horizontalPos: waypoint.verticalPos, verticalPos: -waypoint.horizontalPos}, degree - 90);
const moveToWaypoint = (ship: Coordinates, waypoint: Coordinates, times: number): Coordinates => ({horizontalPos: ship.horizontalPos + times * waypoint.horizontalPos, verticalPos: ship.verticalPos + times * waypoint.verticalPos});

const moveWaypointStyle = (instructions: Instruction[]): number => {
    let ship = {verticalPos: 0, horizontalPos: 0};
    let waypoint = {verticalPos: 1, horizontalPos: 10};
    instructions.forEach(i => {
        switch(i.action) {
            case 'N': waypoint.verticalPos += i.value; break;
            case 'S': waypoint.verticalPos -= i.value; break;
            case 'E': waypoint.horizontalPos += i.value; break;
            case 'W': waypoint.horizontalPos -= i.value; break;
            case 'L': waypoint = rotateLeft(waypoint, i.value); break;
            case 'R': waypoint = rotateRight(waypoint, i.value); break;
            case 'F': ship = moveToWaypoint(ship, waypoint, i.value)
        }
    });
    return Math.abs(ship.verticalPos) + Math.abs(ship.horizontalPos);
};

const instructions: Instruction[] = (await Deno.readTextFile('input.txt')).split(/\n/g).map(l => ({action: l.charAt(0), value: +l.substr(1)}));
console.log('Manhattan distance:', moveWaypointStyle(instructions));