const person = {
  name: "Kirill",
  age: 33,
  hello() {
    return `${this.name} greetings you!`;
  }
};

const spreadPerson = { ...person };

console.log(spreadPerson);
console.log(spreadPerson.hello());

function printName({ name, ...rest }) {
  console.log(name);
  console.log(rest);
}

printName(person);

const array = ['one', 'two', 'three'];
const [first, ...rest] = array;
console.log(first);
console.log(rest);
