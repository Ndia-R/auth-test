import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <div
        className="fixed inset-0 -z-50 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, var(--destructive), transparent 50%)`,
        }}
      />
      <div className="min-h-dvh">
        <Header />
        <main className="mx-auto max-w-7xl px-3 sm:px-6">
          <Outlet />
        </main>
        <div className="sticky top-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
