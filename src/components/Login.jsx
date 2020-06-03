import React from 'react'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom';


const Login = (props) => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(true)

    const procesarDatos = e => {
        e.preventDefault()
        if (!email.trim()) {
            // console.log('Ingrese Email')
            setError('Ingrese Email')
            return
        }
        if (!pass.trim()) {
            // console.log('Ingrese Contraseña')
            setError('Ingrese Contraseña')
            return
        }
        // console.log('Pasando todas las validaciones')
        if (pass.length < 6) {
            // console.log('6 o más carácteres')
            setError('6 o más carácteres en pass')
            return
        }
        // console.log('correcto...')
        setError(null)

        if (esRegistro) {
            registrar()
        } else {
            login()
        }
    }

    const registrar = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)

            await db.collection('usuarios').doc(res.user.uid).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {
            // console.log(error)
            setError(error.message)

            if (error.code === 'auth/email-already-in-use') {
                setError('Usuario ya registrado...')
                return
            }
            if (error.code === 'auth/invalid-email') {
                setError('Email no válido')
                return
            }
        }
    }, [email, pass, props.history])

    const login = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {
            // console.log(error)

            if (error.code === 'auth/user-not-found') {
                setError('Usuario o contraseña incorrecta')
            }
            if (error.code === 'auth/wrong-password') {
                setError('Usuario o contraseña incorrecta')
            }
        }
    }, [email, pass, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro' : 'Login'
                }
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }

                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese un email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese una contraseña"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button
                            className="btn btn-dark btn-lg btn-block"
                            type='submit'>
                            {
                                esRegistro ? 'Registrar' : 'Acceder'
                            }
                        </button>
                        <button
                            className="btn btn-info btn-sm btn-block"
                            onClick={() => setEsRegistro(!esRegistro)}
                            type='button'
                        >
                            {
                                esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)