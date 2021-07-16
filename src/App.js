import React,{useState} from "react";
import Search from "./components/Search";
import DetailsPage from "./components/DetailsPage";
import PageNotFound from "./components/PageNotFound"
import { createGlobalStyle } from "styled-components";
import UserContext from "./context/UserContext"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [user,setUser] = useState(null);
  return (
    <Router>
      <GlobalStlye />
      <UserContext.Provider value={{user,setUser}}>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/result" component={DetailsPage} />
        <Route exact path="*" component={PageNotFound} />
      </Switch>
      </UserContext.Provider>
    </Router>
  );
};

const GlobalStlye = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
  }

`;
export default App;
