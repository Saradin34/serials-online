import {FC, FormEvent, useState} from 'react';
import {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword
} from '../../firebase.ts';
import './Auth.scss';

const Auth: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Авторизация прошла успешно');
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('Успешная регистрация');
            }
        } catch(error: any) {
            setError(error.message);
        }
    }

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Введите Email для восстановления пароля");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert('Письмо для восстановления отправлено на почту');
        } catch(error: any) {
            setError(error.message);
        }
    }

    return (
        <>
            <form onSubmit={handleAuth} className="form-auth">
                <h3>{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
                {error && <div style={{color: '#f76b04', marginBottom: '10px'}}>{error}</div>}
                <div className="form-input">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Почта:"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Пароль:"
                    />
                </div>
                <button type='submit' className="auth-btn">
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <div className="form-checkbox">
                    <input type="checkbox" id="save-computer"/>
                    <label htmlFor="save-computer">Запомнить на этом компьютере</label>
                </div>
            </form>
            <div className="flex-references">
                <button className="flex-reference" onClick={handleForgotPassword}>Забыли пароль?</button>
                <button className="flex-reference" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Регистрация' : 'Войти'}
                </button>
            </div>
        </>
    );
};

export default Auth;