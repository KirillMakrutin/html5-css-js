class Entity {
  constructor( name, age )
  {
    this.name = name;
    this.age = age;
  }

  greet()
  {
    console.log( `Hi! I'm ${this.name} of ${this.age} years old.` )
  }
}

export default Entity;
