const getNeighboursToCheck = (idx: number, width: number) => [-width, width].concat((idx % width) != 0 ? [width - 1, -1, -width - 1] : []).concat((idx % width) != width - 1 ? [-width + 1, 1, width + 1]: [])

const countSurroundingNeighbours = (idx: number, ferry: string, width: number): number => getNeighboursToCheck(idx, width).filter((pos) => ferry[idx + pos] === '#').length;
const countVisibleNeighbours = (idx: number, ferry: string, width: number): number => getNeighboursToCheck(idx,width).filter(direction => getSeatsOnVisibleLine(idx, ferry, width, direction)).length;

const isOnLeftBorderTryingToGoFurther = (idx: number, width: number, direction: number) => (idx % width) == 0 && [width - 1, -1, -width - 1].includes(direction);
const isOnRightBorderTryingToGoFurther = (idx: number, width: number, direction: number) => (idx % width) == width - 1 && [-width + 1, 1, width + 1].includes(direction);
const isLookingFurtherNonsense = (ferry: string, idx: number, direction: number) => ferry[idx + direction] === 'L' || !ferry[idx + direction];

const getSeatsOnVisibleLine = (idx: number, ferry: string, width: number, direction: number): boolean => {
    if (isOnLeftBorderTryingToGoFurther(idx, width, direction) || isOnRightBorderTryingToGoFurther(idx, width, direction)) return ferry[idx] === '#';
    else if (isLookingFurtherNonsense(ferry, idx, direction)) return false;
    else return ferry[idx+direction] === '#' ? true : getSeatsOnVisibleLine((idx+direction), ferry, width, direction);
}

const transformTakenSeat = (ferry: string, idx: number, neighboursCount: number, tooManyPeopleFactor: number) => ferry[idx] === '#' && neighboursCount > tooManyPeopleFactor ? 'L' : ferry[idx];
const isEmptyAndDesiredSeat = (ferry: string, seat: { neighboursCount: any; idx: number }) => ferry[seat.idx] === 'L' && seat.neighboursCount === 0;

const pleaseHaveASeatUntilEverybodyIsHappy = (seats: string, width: number, countNeighbours: Function, tooManyPeopleFactor: number): number => {
    let newSeatSituation = seats.split('')
        .map((_, idx) => ({idx, neighboursCount: countNeighbours(idx, seats, width)}))
        .map(seat => isEmptyAndDesiredSeat(seats, seat) ? '#' : transformTakenSeat(seats, seat.idx, seat.neighboursCount, tooManyPeopleFactor))
        .join('');
    return seats === newSeatSituation ? seats.split('').filter(c => c === '#').length : pleaseHaveASeatUntilEverybodyIsHappy(newSeatSituation, width, countNeighbours, tooManyPeopleFactor);
};

const input: string = (await Deno.readTextFile('input.txt'));
const ferry = {seats: input.replace(/\n/g, ''), width: input.indexOf('\n')};

console.log("Number of seats occupied (surrounding neighbours method):", pleaseHaveASeatUntilEverybodyIsHappy(ferry.seats, ferry.width, countSurroundingNeighbours, 3));
console.log("Number of seats occupied (visible neighbours method):", pleaseHaveASeatUntilEverybodyIsHappy(ferry.seats, ferry.width, countVisibleNeighbours, 4));