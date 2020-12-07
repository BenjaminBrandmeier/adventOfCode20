import {Bag} from './data.ts';

const containsShinyGoldBag = (luggage: Map<string, Bag[]>, contents: Bag[]): boolean => {
    if (contents[0].color === undefined) {
        return false;
    } else if (contents.find(b => b.color === 'shiny gold')) {
        foundBags++
        return true
    }
    return !!(contents.find((b) => containsShinyGoldBag(luggage, luggage.get(b.color)!)))
}

const countBags = (bag: string, luggage: Map<string, Bag[]>, contents: Bag[]): number => {
    if (contents[0].color === undefined) {
        return 0;
    }
    return contents.reduce((acc, b) => acc + b.amount + (b.amount * countBags(b.color, luggage, luggage.get(b.color)!)), 0);
}

const getBags = (line: string): Bag[] => {
    return line.split(",").map(s => {
        let bagsFound = s.match(/(no other bags)|((\d) (\w+ \w+) bags?)/)!;
        return {amount: +bagsFound[3], color: bagsFound[4]}
    })
}

const readAndParseInput = async (): Promise<Map<string, Bag[]>> => {
    let luggage: Map<string, Bag[]> = new Map();
    (await Deno.readTextFile('input.txt')).split("\n").forEach(line => {
        const colorAndContent = line.split(/(\w+ \w+) bags contain (.*)/);
        luggage.set(colorAndContent[1], getBags(colorAndContent[2]));
    });
    return luggage;
}

let foundBags = 0;
let luggage: Map<string, Bag[]> = await readAndParseInput();

luggage.forEach((bagContents: Bag[]) => containsShinyGoldBag(luggage, bagContents));
console.log({foundBags});
console.log("how many bags are required: " + countBags("shiny gold", luggage, luggage.get('shiny gold')!));