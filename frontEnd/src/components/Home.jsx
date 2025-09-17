import axios from "axios"

export function Home(){
    const token = localStorage.getItem('token')
    axios.get("http://localhost:2354/home", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(data => console.log(data))
    .catch(e => console.log(e))
    
    return(
        <div className="" style={{backgroundColor:'#f00'}}>
            Hola mundo
        </div>
    )
}