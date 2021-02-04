import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
//import UserItem from "./component/users/UserItem";
import Users from "./component/users/Users";
import Search from "./component/users/Search";
import Alert from "./component/layout/Alert";
import About from "./component/pages/About";
import User from "./component/users/User";
import axios from "axios";
import GithubState from "./context/github/GithubState";
import "./App.css";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Life Cycle Method
  // Whenever the app loads this get fires
  // async componentDidMount() {
  //   //No need to use promises
  //   setLoading(true);
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }

  // useEffect(() => {
  //   async function getInitialUserData() {
  //     setLoading(true);
  //     const res = await axios.get(
  //       `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     setUsers(res.data);
  //     setLoading(false);
  //   }

  //   //this.setState({ users: res.data, loading: false });
  //   getInitialUserData();

  //   //es-lint-disable-next-line
  // }, []);
  //Search Github Users

  const showAlert = (msg, type) => {
    //this.setState({ alert: { msg, type } });
    setAlert({ msg, type });

    setTimeout(() => {
      //this.setState({ alert: null });
      setAlert(null);
    }, 5000);
  };
  //Life Cycle Method
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
