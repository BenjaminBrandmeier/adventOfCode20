export interface Instruction {
    action: string,
    value: number
}

export interface Coordinates {
    horizontalPos: number,
    verticalPos: number
}

export enum Direction {
    NORTH, EAST, SOUTH, WEST
}