import React from "react";
import Search from "./components/Search";
import { createGlobalStyle } from "styled-components";
const App = () => {
  return (
    <div>
      <GlobalStlye/>
      <Search/>
    </div>
  )
}

const GlobalStlye = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
  }

`
export default App;