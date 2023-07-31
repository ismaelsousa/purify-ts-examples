import { Tuple } from "purify-ts/Tuple";

const test = Tuple(1, "a"); // => [1, 'a']
const iterator = test[Symbol.iterator]();

function* name2() {
  yield 10;
  return 20;
}
function* name() {
  const a = yield* name2();
  console.log("🚀 ~ file: Tuple.ts:12 ~ function*name ~ a:", a);
}
const myGenerator = name();
console.log(myGenerator.next()); // => { value: 1, done: false }

// console.log(iterator.next()); // => { value: 1, done: false }
// console.log(iterator.next()); // => { value: 'a', done: false }
// console.log(iterator.next()); // => { value: undefined, done: true }
// console.log([...test]); // => [1, 'a'

const testasync = async () => {
  return 5;
};
