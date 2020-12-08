import {Instruction} from "./data.ts";
import {deepClone} from "https://cdn.jsdelivr.net/gh/motss/deno_mod@v0.10.0/deep_clone/mod.ts";

function boot(bootCode: Instruction[]): string {
    let acc = 0; let idx = 0;
    while (true) {
        const cmd = bootCode[idx]
        switch (cmd?.operation) {
            case 'acc': acc += cmd.argument;
            case 'nop': idx++; break;
            case 'jmp': idx += cmd.argument; break;
            case 'deprecated': return `Infinite Loop with ${acc} accumulated.`;
            default: console.log(`Found a way out with ${acc} accumulated.`); return "Found a way out!";
        }
        cmd.operation = 'deprecated';
    }
}

async function createBootCodeVariation(originalBootCode: Instruction[]) : Promise<Instruction[]> {
    const bootCodeToBeMessedWith: Instruction[] = await deepClone(originalBootCode, {absolute: false}) as Instruction[];
    const allNopAndJmpCommands = bootCodeToBeMessedWith.filter(i => ['nop', 'jmp'].includes(i.operation));
    const instructionToBeChanged = allNopAndJmpCommands[getRandomIndex(allNopAndJmpCommands.length)];
    instructionToBeChanged.operation = instructionToBeChanged.operation === 'nop' ? 'jmp' : 'nop';
    return bootCodeToBeMessedWith;
}

const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

const readInput = async (): Promise<Instruction[]> => (await Deno.readTextFile('input.txt'))
    .split(/\n/).map(l => ({operation: l.split(' ')[0], argument: +l.split(' ')[1]}));

console.log(boot(await readInput())); // 8a
while ('Found a way out!' !== boot(await createBootCodeVariation(await readInput()))) {} // 8b