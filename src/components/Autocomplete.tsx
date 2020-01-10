import React from 'react';
import '../css/Autocomplete.css'; 
import { Subject, empty } from 'rxjs';
import { filter,debounceTime, distinctUntilChanged,switchMap, catchError }  from 'rxjs/operators'

interface State{
    searchItems :  data[],
    searchText : any
}

interface Props{

}

interface data{
    key : any,
    value : any,
}

let searchStream = new Subject();


class Autocomplete extends React.Component<State,Props>{
    state:State = {
        searchItems : [],
        searchText : ''       
    }
    componentDidMount(){
         this.initializeSearchStream();
            
    }
    initializeSearchStream(){
        searchStream
        .pipe(
            filter((val:any)=> val.length > 2 ),
            debounceTime(250),
            switchMap((val:any) => {

               
                return fetch(
                  `https://restcountries.eu/rest/v2/name/`+val
                )
                  .then(val => val.json())
                }),
                catchError(err => {
                    return empty();
                  }),
            
            distinctUntilChanged()
        )
        .subscribe(val=>{
            if(val.length > 0){
                val.forEach((item:any)=>{
                    this.setState({ searchItems : [...this.state.searchItems,{key: item.numericCode,value:item.name}]})
                })
            }
            
        })
    }
    
    handleOnchange = (e:any)=>{
        let val:any = e.currentTarget.value;
        this.setState({searchText : val,searchItems : []},()=>{
            searchStream.next(val)
        })
        
    }

    handleOnClick = (e:any)=>{
        let val:any = e.target.dataset.val; 
        this.setState({searchText : val,searchItems : []},()=>{
            searchStream.next(val)
        })
    }

    renderList(){
        return (
            this.state.searchItems.map((item,index)=>{
               return (<div key={index} >
                    <strong data-val={item.value}>{item.value}</strong>
                    <input type="hidden"  value={item.value}  />
                </div>
               )
            }

            ) 
        )
    }
    handleReset =()=>{
        this.setState({searchText : '',searchItems : []});
    }
    render(){
        console.log(this.state.searchItems);
        return(
            <div className="dropdown">
                <div className="autocomplete">
                        <input type="text" placeholder="Search.." id="searchBox" value={this.state.searchText} onChange={this.handleOnchange} autoComplete="off" />
                        <button className="close-icon" type="reset" onClick={this.handleReset}></button>
                        {
                            this.state.searchText.length <=2 ? <div className="error-message">
                                Please Type Atleast 3 chracter
                            </div>
                              : (
                                this.state.searchItems.length > 0 ? <div id="myInputautocomplete-list" className="autocomplete-items" onClick={this.handleOnClick}>{this.renderList() }</div> : this.state.searchText.length > 2 &&<div className="error-message">No Result Found</div>
                              )
                              
                             
                             
                        }
                        
                        
                </div>
            </div>
        )
            
        
    }

}

export default Autocomplete;