import './App.css';
import CreateEmployee from './components/CreateEmployee';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import UpdateEmployee from './components/UpdateEmployee';
import { Button, } from 'semantic-ui-react'

function App() {


  return (
    <div className="App">
      <header className='header'>
                <img className='logo' src='https://d3timt52sxdbq0.cloudfront.net/wp-content/uploads/2020/07/new-nutcache-logo.png'/>
                <div className='header-buttons'>
                    <a href='/' ><Button>Home</Button></a> 
                    <a href='/create'><Button>Create Employee</Button></a>
                </div>
      </header>
        <Router>
          <div>
            <Route path='/create'>
              <CreateEmployee/>
            </Route>
          </div>
          <div>
            <Route exact path='/'>
              <MainPage/>
            </Route>
          </div>
          <div>
            <Route path='/update' >
              <UpdateEmployee/>
            </Route>
          </div>
        </Router>
    </div>
  );
}

export default App;
