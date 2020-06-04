import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {auth} from '../firebase'

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }

    return (
        <div className='d-flex flex-row-reverse navbar navbar-dark bg-dark '>
            {/* <Link to="/" className="navbar-brand">CRUD</Link> */}
            <div>
                <div className="d-flex">
                    <NavLink
                        className="btn btn-outline-info mr-2"
                        to="/"
                        exact
                    >
                        Inicio
                    </NavLink>
                    {
                        props.firebaseUser !== null ? (
                            <NavLink
                                className="btn btn-outline-info mr-2"
                                to="/admin"
                            >
                                Admin
                            </NavLink>
                        ) : null
                    }

                    {
                        props.firebaseUser !== null ? (
                            <button
                                className="btn btn-outline-info"
                                onClick={() => cerrarSesion()}
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                                <NavLink
                                    className="btn btn-outline-info"
                                    to="/login"
                                >
                                    Login
                            </NavLink>
                            )
                    }

                </div>

            </div>
        </div>
    )
}

export default withRouter(Navbar)
