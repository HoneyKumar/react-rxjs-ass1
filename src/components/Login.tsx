import React from 'react';
interface State{
    email : any,
    password : any
}
class Login extends React.Component<State>{
    state:State = {
        email : '',
        password : ''
    }
    render(){
        return(
            <div className="container">
                <h2>Login form</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }
}
export default Login;