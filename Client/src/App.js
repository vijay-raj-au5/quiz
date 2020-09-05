import React, { useState } from 'react';
import './App.css';
import User from "./Components/userLogin";
import Question from "./Components/quiz";
import ScoreBoard from "./Components/userResult";
import { BrowserRouter, Switch, Route,Redirect } from "react-router-dom";
import axios from "axios";
import questions from "./Components/Ques"



function App() {
  


  return (
    <BrowserRouter>
      <nav class="navbar  bg-info text-light">
      <a class="navbar-brand text-light" href="/">Trivia Quiz</a>
    </nav>
      <div className="container">
        <Switch>

           <Route path='/' exact>
              <Redirect to='/login' />
            </Route>
            <Route path='/login' component={User} exact />
            <Route path='/quiz' component={Question} exact />
            <Route path='/leaderboard' component={ScoreBoard} exact />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
