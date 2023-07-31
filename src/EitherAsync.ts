import { Right } from "purify-ts";
import { EitherAsync } from "purify-ts/EitherAsync";

const test = EitherAsync<Error, number>(
  async ({ liftEither, fromPromise, throwE }) => {
    console.log("🚀 ~ file: EitherAsync.ts:4 ~ ");
    return await Promise.resolve(5);
  }
);

const testCopyInPromise = () => {
  console.log("🚀 ~ file: testCopyInPromise ");

  return () => Promise.resolve(5);
};

async function a() {
  // const b = test.run();
  // const c = await b;
  // const b = (await test.run()).ifLeft((x) => console.error(x));
  const b = test
    .ifLeft((x) => console.log(x))
    .ifRight((x) => console.log(x))
    .ifRight((x) => console.log(x));

  console.log("🚀 ~ file: EitherAsync.ts:24 ~ a ~ b:", (await b).extract());
  const c = await testCopyInPromise()().then(testCopyInPromise());
  console.log("🚀 here", c);
}
// a();

interface test {
  (param: number): MyClass;
  c: () => number;
}
class MyClass {
  param: number;
  constructor(param: number) {
    this.param = param;
  }
}

const obja: test = Object.assign(
  function test(param: number) {
    return new MyClass(param);
  },
  {
    c: () => 1,
  }
);

// MyClass.prototype.constructor = obja;

const objnew = new Function("a", "return a");
// console.log(objnew(1));
// <L, R>(
//   runPromise: (helpers: EitherAsyncHelpers<L>) => PromiseLike<R>
// ): EitherAsync<L, R> => new EitherAsyncImpl(runPromise)

const either = EitherAsync.liftEither(Right(5));
either.run().then(console.log);
