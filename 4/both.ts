import {PassportCandidate} from './data.ts';

async function day4() {
    const passportCandidates = parseInput(await readInput());

    console.log('numberOfValidPassportsFirst:', passportCandidates.filter(passportValidEasy).length);
    console.log('numberOfValidPassportsSecond:', passportCandidates.filter(passportValidStrict).length);
}

const passportValidEasy = (p: PassportCandidate) => p.iyr && p.ecl && p.eyr && p.pid && p.hcl && p.byr && p.hgt;
const passportValidStrict = (p: PassportCandidate) =>
    new RegExp(/^(19[2-9]\d|200[0-2])$/).test(p.byr) &&
    new RegExp(/^20(1\d|20)$/).test(p.iyr) &&
    new RegExp(/^20(2\d|30)$/).test(p.eyr) &&
    new RegExp(/^(1([5-8]\d|9[0-3])cm)|((59|6\d|7[0-6])in)$/).test(p.hgt) &&
    new RegExp(/#[0-9a-f]{6}/).test(p.hcl) &&
    new RegExp(/(amb|blu|brn|gry|grn|hzl|oth)/).test(p.ecl) &&
    new RegExp(/^\d{9}$/).test(p.pid);

const getValueForTag = (s: string, tag: string): string => s.split(new RegExp(`${tag}:(.+?)( |$)`))[1];

const parseInput = (input: string[]): PassportCandidate[] => input.map(p => ({
    byr: getValueForTag(p, 'byr'), iyr: getValueForTag(p, 'iyr'), eyr: getValueForTag(p, 'eyr'),
    hgt: getValueForTag(p, 'hgt'), hcl: getValueForTag(p, 'hcl'), ecl: getValueForTag(p, 'ecl'),
    pid: getValueForTag(p, 'pid'), cid: getValueForTag(p, 'cid')
}));

async function readInput(): Promise<any> {
    return (await Deno.readTextFile('input.txt'))
        .split(/\s\n/g)
        .map(s => s.replace(/\n/g, ' '));
}

await day4();