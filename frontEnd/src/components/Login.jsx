import { useState } from "react";
import '../styles/Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Login(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre:"",
        password:""
    })

    const formControl = async (e)=>{
        e.preventDefault();
        try{        
            const res = await axios.post("http://localhost:2354/login", formData);

            if(res.status === 201){
                localStorage.setItem('token', res.data.token);
                alert("Bienvenido " + res.data.message);
                navigate('/')
            }
        }catch(e){
            console.log(e)
                alert(e.response?.data?.message || "Error desconocido");


        }
    }

    const inputChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    return(
        <>
            <div className="login-section">
                <section className="form-section">
                    <form onSubmit={formControl} className="form">
                        <h2>Iniciar Sesión</h2>
                        <label htmlFor="nombre">Ingresa un nombre</label>
                        <input name='nombre' value={formData.nombre} 
                        onChange={inputChange} type="text" id="nombre" />
                        <label htmlFor="password">Ingresa un password</label>
                        <input name='password' value={formData.password}
                        onChange={inputChange} type="password" id="password" />
                        <button type="submit" id="btn-login">Iniciar Sesión</button>
                    </form>
                </section>
            </div>
        </>
    )
}