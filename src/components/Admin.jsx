import React from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom';


const Admin = (props) => {

    const [user, setUser] = React.useState(null)

    //currentUser nos trae la información del usuario
    
    React.useEffect(() => {
        if(auth.currentUser){
            console.log('existe')
            setUser(auth.currentUser)
        }else{
            console.log('no existe')
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            <h3 className= 'text-center'>Ruta Protegida</h3>
            {
                user && (
                    <p>{user.email}</p>
                )
            }
        </div>
    )
}

export default withRouter(Admin)
