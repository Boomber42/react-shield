import "./index.css"
import Api from "../../helpers/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function LoginRouter() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')!);
        if(user){
            navigate('/');
        }
    }, [])

    const submitForm = async (event: any) => {
        event.preventDefault();
        const api = new Api();
        var user = await api.singIn(email, password);
        if(!user){
            return;
        }
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
    }

    return (
        <div className="bodyPage">
            <form onSubmit={submitForm} className="fromStyle">
                <label htmlFor="email" className="labelStyle">Email:</label>
                <input type="email" id="email" placeholder="Insira um email válido" name="email" className="inputStyle" onChange={(event) => setEmail(event.target.value)} />

                <label htmlFor="password" className="labelStyle">Senha:</label>
                <input type="password" id="password" placeholder="Digite sua senha" name="password" className="inputStyle" onChange={(event) => setPassword(event.target.value)} />
                <input type="submit" disabled={!email || !password} className="inoputButtonStyle" />
            </form>
        </div>
    )
}