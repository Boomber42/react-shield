import Button from "../../components/button/button";
import Api from "../../helpers/api";

export default function LoginRouter() {
    const submitForm = async () => {
        const api = new Api();
        api.singIn('', '')
    }
    
    return (
        <div style={{
            height: '100vh'
        }}>
            <form onSubmit={() => console.log('formulario submetido')} style={{
                width: '500px',
                height: '500px',
                backgroundColor: 'red',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '10px'
            }}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Insira um email válido" name="email"></input>

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder="Digite sua senha" name="password"></input>
                {/* <input type="submit" ></input> */}
                <Button name='cadastrar' onClick={submitForm}></Button>
            </form>
        </div>
    )
}