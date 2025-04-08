import {FC, FormEvent, useState} from 'react';
import {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword
} from '../../firebase.ts';
import './Auth.scss';

const Auth: FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>('');

    const handleAuth = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!isLogin && password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true);
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

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsAuthenticated(false);
            setEmail('');
            setPassword('');
            setUsername('');
        } catch(error: any) {
            setError(error.message);
        }
    }

    const handleAvatarChange = (selectedAvatar: string) => {
        setAvatar(selectedAvatar);
    }

    if (isAuthenticated) {
        return (
            <div className="profile-container">
                <h3>Профиль</h3>
                <div className="avatar-section">
                    <div className="avatar-options">
                        {['avatar1', 'avatar2', 'avatar3', 'avatar4'].map((av) => (
                            <div
                                key={av}
                                className={`avatar-option ${avatar === av ? 'selected' : ''}`}
                                onClick={() => handleAvatarChange(av)}
                            >
                                <img src={`/${av}.png`} alt={av} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="profile-actions">
                    <button className="profile-btn message-btn">
                        Сообщения
                    </button>
                    <button className="profile-btn logout-btn" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleAuth} className="form-auth">
                <h3>{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
                {error && <div style={{color: '#f76b04', marginBottom: '10px'}}>{error}</div>}
                <div className="form-input">
                    {!isLogin && (
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Логин:"
                            className="auth-input"
                        />
                    )}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Почта:"
                        className={`auth-input ${!isLogin ? "auth-email" : ""}`}
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Пароль:"
                        className={`auth-input ${!isLogin ? "auth-password" : ""}`}
                    />
                    {!isLogin && (
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder="Повторите пароль:"
                            className="auth-input"
                        />
                    )}
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