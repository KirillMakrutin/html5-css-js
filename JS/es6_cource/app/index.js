import Hobbit from './hobbit';

function butter(...rest) {
  let a = [1, 2, 3, ...rest];
  return a;
}

console.log(butter(4, 5, 6));

let Frodo = new Hobbit("Frodo Baggins", 32);
Frodo.greet();
