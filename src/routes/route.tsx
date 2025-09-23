import AuthCallbackPage from "@/routes/auth-callback/page";
import RootLayout from "@/routes/layout";
import RootPage from "@/routes/page";
import UserPage from "@/routes/user/page";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<RootPage />} />

        <Route path="auth-callback" element={<AuthCallbackPage />} />

        <Route path="user" element={<UserPage />} />
      </Route>
    </Route>
  )
);
