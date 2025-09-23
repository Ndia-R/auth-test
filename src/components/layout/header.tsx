import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';

export default function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = 'http://localhost:8888/bff/auth/login';
  };

  // 通常ログアウト（BFFセッションのみクリア）
  async function normalLogout() {
    try {
      const response = await fetch('http://localhost:8888/bff/auth/logout', {
        method: 'POST',
        credentials: 'include', // セッションCookie送信のため必須
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Normal logout successful:', result.message);
        navigate('/');
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  // 完全ログアウト（BFFセッション + Keycloakセッションクリア）
  async function completeLogout() {
    console.log('Complete logout!!!');

    try {
      const response = await fetch(
        'http://localhost:8888/bff/auth/logout?complete=true',
        {
          method: 'POST',
          credentials: 'include', // セッションCookie送信のため必須
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Complete logout successful:', result.message);

        // 🎯 重要：完全ログアウト後は明示的にログイン画面へリダイレクト
        // これにより次回ログイン時に確実にKeycloak認証画面が表示される
        window.location.href = '/user'; // またはログイン画面のパス
      } else {
        console.error('Complete logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Complete logout failed:', error);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6">
        <nav>
          <ul className="flex h-16 items-center gap-8 text-lg font-bold">
            <li>
              <Link to={'/'}>HOME</Link>
            </li>
            <li>
              <Link to={'/user'}>USER</Link>
            </li>
          </ul>
        </nav>
        <Button onClick={handleLogin}>ログイン</Button>
        <Button onClick={normalLogout}>ログアウト</Button>
        <Button onClick={completeLogout}>完全ログアウト</Button>
      </div>
    </header>
  );
}
