import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


const App = () => {
  return (
    <Router>
        <div className="container">
            navbar...
            <Switch>
                <Route path="/" exact>
                    Ruta de inicio
                </Route>
                <Route path="/login">
                    Ruta de login
                </Route>
                <Route path="/admin">
                    Ruta de administracion
                </Route>
            </Switch>
        </div>
    </Router>
)
}

export default App