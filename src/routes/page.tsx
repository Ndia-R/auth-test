import { Button } from '@/components/ui/button';

export default function Page() {
  const handleClick = async () => {
    const res = await fetch('http://localhost:8888/bff/auth/health');
    const data = await res.json();
    console.log(data);
  };
  return (
    <>
      <div className="p-8">
        <p>トップページ</p>
        <Button onClick={handleClick}>Button</Button>
      </div>
    </>
  );
}
