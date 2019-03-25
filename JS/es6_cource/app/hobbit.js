import Entity from "./entity";

class Hobbit extends Entity {
  constructor(name, age){
    super(name, age)
  }

  greet()
  {
    console.log(`Hello! I'm ${this.name} from the Shire!`)
  }
}

export default Hobbit;
