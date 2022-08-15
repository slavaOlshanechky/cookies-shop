import {Redirect, Route, Switch} from "react-router-dom";
import Main from "../../layouts/main";

function App() {
    return (
        <div>
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/logout" component={LogOut}/>
                    <Redirect to="/"/>
                </Switch>
        </div>
    );
}

export default App;
