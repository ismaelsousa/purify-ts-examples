import {
  Codec,
  FromType,
  GetType,
  number,
  oneOf,
  optional,
  string,
} from "purify-ts";

const User = Codec.interface({
  id: number,
  name: oneOf([optional(string), optional(number)]),
  age: optional(number),
  location: optional(oneOf([optional(string), optional(number)])),
});

type User = GetType<typeof User>;

type A = { a?: number };
const A: Codec<FromType<A>> = Codec.interface({ a: optional(number) });

console.log(User.decode({ id: 1, name: 20 }).unsafeCoerce());
