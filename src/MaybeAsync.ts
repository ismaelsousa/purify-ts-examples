import { Just, Maybe } from "purify-ts";
import { MaybeAsync } from "purify-ts/MaybeAsync";

const a = MaybeAsync(async ({ fromPromise, liftMaybe }) => {
  console.log("🚀 ~ file: index.ts:4 ~ MaybeAsync");

  return fromPromise(Promise.resolve(Maybe.of(1)));
});

const newMaybePromise = async () => {
  console.log("🚀 ~ file: MaybeAsync.ts:1 ~ _");
  return Promise.resolve(5);
};
const newMaybePromise2 = async (_: number) => {
  console.log("🚀 ~ file: MaybeAsync.ts:2");
  return Promise.resolve("val" + _);
};

const newMaybeAsync = MaybeAsync(() => {
  console.log("🚀 ~ file: MaybeAsync.ts:1 ~ _");
  return Promise.resolve(5);
}).chain((_) => {
  return MaybeAsync(() => {
    console.log("🚀 ~ file: MaybeAsync.ts:2");
    return Promise.resolve("val" + _);
  });
});

async function b() {
  const b = await a;
  b.chain((x) => Just(x + 1))
    .ifJust((x) => console.log("🚀 ~ file: MaybeAsync.ts:12 ~ b ~ x:", x))
    .chain((x) => Just(x + 1))
    .ifJust((x) => console.log("🚀 ~ file: MaybeAsync.ts:12 ~ b ~ y:", x))
    .map((x) => Maybe.of(x + 1))
    .ifJust((x) => console.log("🚀 ~ file: MaybeAsync.ts:12 ~ b ~ map:", x));

  const c = await newMaybeAsync.run();

  c.ifJust(console.log);

  const d = await newMaybePromise().then((_) => newMaybePromise2(_));
}

b();
