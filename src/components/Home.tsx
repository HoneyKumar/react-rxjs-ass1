import React from 'react';
import {Subject} from 'rxjs';
import {
    debounceTime
  } from 'rxjs/operators';
interface State{
    previousSelectedValue : string,
    currentSelectedValue : string,
    allSelectedValue : Array<string>,
    error : boolean,
    message : string
}

interface Props{

}

let selectCallStream = new Subject();
let errorStream =new Subject();
let messageStream = new Subject();
class Home extends React.Component<State,Props>{

    state:State ={
        previousSelectedValue : '',
        currentSelectedValue : '',
        allSelectedValue : [],
        error : false,
        message : ''
    }
    
    componentDidMount(){
        this.initializeSelectStream();
        this.initializeErrorStream();
        this.initializeMessageStream();
    }
    shouldComponentUpdate(nextProps:Props, nextState:State) {
        return this.state.currentSelectedValue !== nextState.currentSelectedValue;
    }
    componentWillUnmount(){
        selectCallStream.unsubscribe();
        errorStream.unsubscribe();
        messageStream.unsubscribe();
    }
    initializeSelectStream = ()=>{
        
        selectCallStream.pipe(debounceTime(500)).subscribe(val=>{
            this.setState({
                previousSelectedValue : this.state.currentSelectedValue,
                currentSelectedValue : val,
                allSelectedValue : [...this.state.allSelectedValue,val] 
            })
        })
    }
    initializeErrorStream = ()=>{
        errorStream.subscribe(val=>{
            this.setState({error : val})
        })
    }
    initializeMessageStream = ()=>{
        messageStream.subscribe(val=>{
            this.setState({message : val})
        })
    }
    handleChange = (e:any)=>{
        let selectedVal = e.target.value;
        
        if(selectedVal === ''){
            
            errorStream.next(true);
            messageStream.next('Please Select a City');
        }
        
        else{
            errorStream.next(false);
            messageStream.next('');
            selectCallStream.next(selectedVal);
        }
    }

    renderList(allSelectedValues:Array<string>){
        return (
            allSelectedValues.map((item,index)=>{
               return(
                <div className="item" key={index}>
                    {item}
                </div>
               ) 
            }
            )
        )
    }
    render(){
        
        return(
           
            <div className="ui three column grid">
                {this.state.error === true &&
                    <div className="ui negative message">
                    <i className="close icon"></i>
                    <div className="header">
                      {this.state.message}
                    </div>
                    </div>
                }
                <div className="row">
                    <div className="column">
                    <select value={this.state.currentSelectedValue} onChange={this.handleChange}>
                        <option value="">Select City</option>
                        <option value="tokyo">Tokyo</option>
                        <option value="japan">Japan</option>
                        <option value="england">England</option>
                        <option value="japan">India</option>
                        </select> 
                    </div>
                </div>    
                <div className="three column row">
                    <div className="column">
                        Previous Selected Values 
                    </div>
                    <div className="column">
                        Current Selected Value 
                    </div>
                    <div className="column">
                        All Selected Values 
                    </div>
                    <div className="column">
                        {this.state.previousSelectedValue}
                    </div>
                    <div className="column">
                        {this.state.currentSelectedValue}
                    </div>
                    <div className="column">
                        <div className="ui list">
                            {this.renderList(this.state.allSelectedValue)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;