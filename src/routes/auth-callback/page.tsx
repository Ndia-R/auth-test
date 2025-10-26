import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// CSRFトークン取得ヘルパー関数
function getCsrfToken() {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='));
  return cookie ? cookie.split('=')[1] : '';
}

export default function Page() {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await fetch('/api/me/profile', {
          credentials: 'include',
        });
        const data = await res.json();
        console.log('認証成功:', data);
        // CSRFトークンがCookieに設定された
        console.log('CSRF Token:', getCsrfToken());

        // メインページへ遷移
        // navigate('/');
      } catch (e) {
        console.error('Error fetching genres:', e);
      }
    };

    initializeAuth();
  }, [navigate]);

  return <div></div>;
}
