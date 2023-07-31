const promiseLikeObject = {
  then: function (onFulfilled: any, onRejected: any) {
    setTimeout(() => {
      onFulfilled("Promise-like object resolved!");
    }, 5000);
  },
};

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

async function myAsyncFunction() {
  console.log("Before await", new Date().toUTCString());

  const result = await (promiseLikeObject as any);
  console.log("after await", new Date().toUTCString());
  console.log(result);
}

myAsyncFunction();
