import { Either, Left, Right } from "purify-ts/Either";

const right = Right(1);
const left = Left(new Error("error"));

const test1 = Either.encase(() => {
  throw Error("Always fails");
});

const test2 = Left("Error")
  .map((x) => x + "!")
  .mapLeft((x) => x + "L")
  .chainLeft((x) => Right(x + "R"))
  .chain((x) => {
    // console.log("here:", x);
    return Right(x);
  });

// console.log("🚀 ~ file: Either.ts:11 ~ test2:", test2);

// Just run the join in right side
const test3 = Left(Left("Error")).join<never, string>();
// console.log("🚀 ~ file: Either.ts:22 ~ test3:", test3);

const test4 = Right(5).unsafeCoerce();

// it needs to specify the type of the default value
const test5 = Left<string, number | never>("Error").orDefault(0);
// console.log("🚀 ~ file: Either.ts:28 ~ test5:", test5);

const test6 = Left("Error").toMaybe();
const test7 = Right(2).toMaybe();
// console.log("🚀 ~ file: Either.ts:33 ~ test6:", test6, test7.extract());

const testFunc = () => {
  const internalFunc = () => {};

  return internalFunc(), 2;
};

// console.log(testFunc());

// new Promise((resolve, reject) => {
//   reject(1);
// })
//   .then(
//     (x) => console.log(x, "fullfilled"),
//     (x) => console.log(x, "rejected")
//   )
//   .catch((x) => console.log(x, "catch"));

const minhaPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

// minhaPromise
//   .then((valor) => `${valor} e barra`)
//   .then((valor) => `${valor} e barra novamente`)
//   .then((valor) => `${valor} e novamente`)
//   .then((valor) => `${valor} e novamente`)
//   .then((valor) => {
//     console.log(valor);
//   })
//   .catch((erro) => {
//     console.error(erro);
//   });

const fun = async () => {
  return 1;
  //  throw new Error("error");
};

// fun()
//   .catch((x) => 4)
//   .then((x) => console.log(x));

const AsyncFunction = async function () {}.constructor;

const aThenable = {
  then(
    onFulfilled: (arg0: {
      // The thenable is fulfilled with another thenable
      then(onFulfilled: any, onRejected: any): void;
    }) => void,
    onRejected: any
  ) {
    onFulfilled({
      // The thenable is fulfilled with another thenable
      then(onFulfilled, onRejected) {
        setTimeout(() => {
          onFulfilled(42);
        }, 2000);
      },
    });
  },
};

const test8 = async () => {
  console.log("before", new Date().toISOString());

  const x = await (aThenable as any);
  console.log("after", x, new Date().toISOString());
};

test8();
