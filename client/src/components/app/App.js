import {Redirect, Route, Switch} from "react-router-dom";
import Main from "../../layouts/main";

function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
