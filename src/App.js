import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './screens/Home/Home';
import Projects from './screens/Projects/Projects';
import Contact from './screens/Contact/Contact';
import About from './screens/About/About';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Navigation />
            <header className="App-header">
              <h1>evolve<span>,</span> create</h1>
              <div className="tagline">Handsome & Intuitive Digital Experiences<br />by Grenard Madrigal</div>
              <div className="location">Portland, Oregon</div>
            </header>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/projects' component={Projects} />
                <Route path='/about' component={About} />
                <Route path='/contact' component={Contact} />
            </Switch>
            <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
