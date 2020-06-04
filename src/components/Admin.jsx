import React from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom';
import Firestore from './Firestore';


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
        <div className= 'mt-5'>
            {
                user && (
                    
                    <Firestore user= {user}/>
                    
                )
            }
        </div>
    )
}

export default withRouter(Admin)
