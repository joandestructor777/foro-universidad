import '../styles/Register.css';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export function Register(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre:"",
        password:"",
        email:""
    })
    const formControl = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:2354/register', formData);
    if (response.status === 201) {
      console.log('Formulario enviado con éxito: ', response.data);
      setTimeout(() => {
        alert('Usuario creado con éxito');
        navigate('/login')
      }, 1000);
    }
  } catch (e) {
    if (e.response && e.response.status === 401) {
      alert('El nombre de usuario ya existe, intenta con otro');
    } else {
      console.log(e);
      alert('Ocurrió un error inesperado');
    }
  }
};


    const inputChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className="register-section">
                <section className="form-section">
                    <form onSubmit={formControl} className="form">
                        <h2>Registrate</h2>
                        <label htmlFor="nombre">Ingresa un nombre</label>
                        <input name='nombre' value={formData.nombre} 
                        onChange={inputChange} type="text" id="nombre" />
                        <label htmlFor="password">Ingresa un password</label>
                        <input name='password' value={formData.password}
                        onChange={inputChange} type="password" id="password" />
                        <label htmlFor="correo">Ingresa un correo</label>
                        <input name='email' value={formData.email} onChange={inputChange} type="email" id="correo" />
                        <button type="submit" id="btn-submit">Registrarme</button>
                    </form>
                </section>
            </div>
        </>
    )
}