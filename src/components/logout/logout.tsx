
import Button from "../button/button"

export default function Logout(){
    function logoutUser(){
        localStorage.removeItem('user');
        location.reload();
    }

    return(
        <Button name='Logout' onClick={logoutUser}/>
    )
}