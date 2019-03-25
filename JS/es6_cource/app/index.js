import Entity from "./Entity";

function butter(...rest) {
  let a = [1, 2, 3, ...rest];
  return a;
}

console.log(butter(4, 5, 6));

let Merry = new Entity("Merry", 32);
Merry.greet();
