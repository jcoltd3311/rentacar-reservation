'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
// Note: Using the same CSS module as the login page
import styles from '../login/auth.module.css';

// Google Icon SVG
const GoogleIcon = (props) => (
    <svg {...props} viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.978,36.316,44,30.606,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
);

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signup, googleSignIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/account';

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await signup(email, password);
            router.push(redirect);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await googleSignIn();
            router.push(redirect);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authBox}>
                <h1 className={styles.authTitle}>新規登録</h1>
                <p className={styles.authSubtitle}>
                    アカウントを作成して、今すぐ予約を始めよう。
                </p>

                {error && <p className={styles.error}>{error}</p>}

                <button onClick={handleGoogleSignIn} className={styles.googleButton} disabled={loading}>
                     <GoogleIcon className="w-6 h-6"/>
                    <span>Googleで新規登録</span>
                </button>

                <div className={styles.divider}>または</div>

                <form onSubmit={handleSignup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">パスワード</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? '処理中...' : '新規登録'}
                    </button>
                </form>
                
                <p className={styles.redirectText}>
                    すでにアカウントをお持ちですか？ <Link href="/login">ログイン</Link>
                </p>
            </div>
        </div>
    );
}
