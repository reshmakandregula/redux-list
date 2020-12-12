import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FrontPage from "./components/FrontPage";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <FrontPage />
      </div>
    </Provider>
  );
}

export default App;
