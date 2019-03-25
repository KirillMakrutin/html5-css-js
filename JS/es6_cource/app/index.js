/*
import Hobbit from './hobbit';

function butter(...rest) {
  let a = [1, 2, 3, ...rest];
  return a;
}

console.log(butter(4, 5, 6));

let Frodo = new Hobbit("Frodo Baggins", 32);
Frodo.greet();
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
  render()
  {
    return <div>React JS and JSX in action</div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
