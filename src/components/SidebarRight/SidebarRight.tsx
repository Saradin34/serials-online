import {FC, FormEvent, useState} from 'react';
import './SidebarRight.scss';
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail} from '../../firebase.ts';

const SidebarRight: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string | null>('');

    const handleAuth= async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Авторизация прошла успешно')
            } else {
                createUserWithEmailAndPassword(auth, email, password);
                alert('Успешная регистрация')
            }
        } catch(error) {
            setError(error.message)
        }
    }

    const handleForgotPassword = async () => {
        if (!email) {
            setEmail("Введите Email для восстановления пароля")
            return
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert('Письмо для восстановления отправлено на почту');
        } catch(error) {
            setError(error.message);
        }
    }


    return (
        <aside className="sidebar-right">
            <form onSubmit={handleAuth} className="form-auth">
                <h3>Авторизация</h3>
                <div className="form-input">
                    <input onChange={(e) => setEmail(e.target.value)} type="text" id="email" value={email} placeholder="Почта: "/>
                    <input onChange={(e) => setPassword(e.target.value)} type="text" id="password" value={password} placeholder="Пароль: "/>
                </div>
                <button type='submit' className="auth-btn">
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <div className="form-checkbox">
                    <input type="checkbox" name="save-computer"/>
                    <label htmlFor="save-computer" id="save-computer">Запомнить на этом компьютере</label>
                </div>
            </form>
            <div className="flex-references">
                <button className="flex-reference" onClick={handleForgotPassword}>Забыли пароль?</button>
                <button className="flex-reference" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Регистрация' : 'Войти'}
                </button>
            </div>
            {/*<div className="flex-references">*/}
            {/*    <Link to="/reset">Забыли пароль?</Link>*/}
            {/*    <Link to="/registration">Регистрация</Link>*/}
            {/*</div>*/}
        </aside>
    );
};

export default SidebarRight;