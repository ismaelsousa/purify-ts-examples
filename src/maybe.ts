import { Just, Maybe } from "purify-ts";

const a = Maybe.of(1)
  .alt(Maybe.of(2))
  .chain((x) => Just(x + 1))
  .chainNullable((x) => (x > 2 ? x : null))
  .chain((x) => Just(x + 1));

console.log("🚀 ~ file: index.ts:4 ~ a:", a.unsafeCoerce());
