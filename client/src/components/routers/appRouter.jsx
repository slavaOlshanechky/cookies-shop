import {Redirect, Route, Switch} from "react-router-dom";

const appRouter = () => {
  return(
      <>
          <Switch>
              <Route path="/auth/login" component={LoginPage} />
              <Route path="/auth/register" component={RegisterPage} />
              <Route path="/auth/logout" component={Logout} />
              <Route path="/" component={HomePage} />
              <Redirect to="/" />
          </Switch>
      </>
  )
}