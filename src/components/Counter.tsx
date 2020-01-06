import React from 'react';
import { Subject } from 'rxjs';
interface Props{

};
interface State{
    count: number
};
 // we create a subject
const Count = new Subject();

class Counter extends React.Component<Props,State>{
   // initializing stae
    state: State = {
        count: 0
      };
    
    

    componentDidMount(){
        Count.subscribe((val:any) => this.setState({ count: this.state.count + val  }));

    }

    render(){
        //render component
        return(
            <div>
                <div>{this.state.count}</div>
                <button onClick={()=>Count.next(1)}>Increment</button>
                <button onClick={()=>Count.next(-1)}>Decrement</button>
            </div>
        );
    }
}

export default Counter;