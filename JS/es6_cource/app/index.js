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

class App extends Component {
  constructor( props )
  {
    super( props );
    this.state = {
      loaded: false,
      title: '',
      body: ''
    }
  }

  componentDidMount()
  {
    fetch( 'https://jsonplaceholder.typicode.com/posts/1' )
        .then( resp => resp.json() )
        .then( json => this.setState( {
          loaded: true,
          title: json.title,
          body: json.body
        } ) )
  }

  render()
  {
    let display = <div>Loading...</div>;
    if ( this.state.loaded )
    {
      display = <div>
        <h1>{this.state.title}</h1>
        <div>{this.state.body}</div>
      </div>
    }

    return display;
  }
}

ReactDOM.render( <App/>, document.getElementById( 'root' ) );
