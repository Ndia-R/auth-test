import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';

// CSRFトークン取得ヘルパー関数
function getCsrfToken() {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='));
  return cookie ? cookie.split('=')[1] : '';
}

export default function Header() {
  const navigate = useNavigate();

  const handleHealth = async () => {
    try {
      const res = await fetch('/api/me/reviews', {
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error('Error fetching genres:', e);
    }
    try {
      const res = await fetch('/api/me/favorites', {
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error('Error fetching genres:', e);
    }
  };

  const handleGenres = async () => {
    try {
      const res = await fetch('/api/genres');
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error('Error fetching genres:', e);
    }
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:8888/bff/auth/login';
  };

  // 通常ログアウト（BFFセッションのみクリア）
  async function normalLogout() {
    try {
      const response = await fetch('/bff/auth/logout', {
        method: 'POST',
        credentials: 'include', // セッションCookie送信のため必須
        headers: {
          'X-XSRF-TOKEN': getCsrfToken(), // CSRFトークンをヘッダーに追加
        },
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
      const response = await fetch('/bff/auth/logout?complete=true', {
        method: 'POST',
        credentials: 'include', // セッションCookie送信のため必須
        headers: {
          'X-XSRF-TOKEN': getCsrfToken(), // CSRFトークンをヘッダーに追加
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Complete logout successful:', result.message);

        // 🎯 重要：完全ログアウト後は明示的にログイン画面へリダイレクト
        // これにより次回ログイン時に確実にKeycloak認証画面が表示される
        window.location.href = '/logout-complete';
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
        <Button onClick={handleHealth}>Health</Button>
        <Button onClick={handleGenres}>ジャンル</Button>
        <Button onClick={handleLogin}>ログイン</Button>
        <Button onClick={normalLogout}>ログアウト</Button>
        <Button onClick={completeLogout}>完全ログアウト</Button>
      </div>
    </header>
  );
}
