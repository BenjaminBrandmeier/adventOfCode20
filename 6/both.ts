const grpAnswers = (await Deno.readTextFile('input.txt')).replace(/\n(?=.)/g, '').split('\n')
const grpCount = (await Deno.readTextFile('input.txt')).split(/\n\n/).map(s => s.split(/\n/).length)

const first = grpAnswers.flatMap(s => [...new Set(s.split(''))]).length;
const second = grpAnswers.map((a, i) => [...'abcdefghijklmnopqrstuvwxyz'].filter(c => a.split(c).length - 1 === grpCount[i])).map(a => a.length).reduce((a, b) => a + b);

console.log({first}, {second})
