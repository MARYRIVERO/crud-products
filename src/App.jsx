import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import { auth } from './firebase'
import Inicio from './components/Inicio';



const App = () => {

    const [firebaseUser, setFirebaseUser] = React.useState(false)

    //onAuthStateChanged: va evaluando si existe el usuario,
    // por lo tanto si se cierra sesión se vuelve a ejecutar onAuthStateChanged()

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user)
            if (user) {
                setFirebaseUser(user)
            } else {
                setFirebaseUser(null)
            }
        })
    }, [])

    return firebaseUser !== false ? (

        <Router>
            <div className="container">
                <Navbar firebaseUser={firebaseUser} />
                <Switch>
                    <Route path="/" exact>
                        <Inicio />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                </Switch>
            </div>
        </Router>

    ) : (
            <p>Cargando...</p>
        )
}

export default App