import greeting from "./greeting";

export default class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    greeting(this.name);
  }
}
