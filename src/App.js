import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import Feed from "./components/Feed";
import PrivateRoute from './PrivateRoute';

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="Feed" element={<PrivateRoute> <Feed/> </PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
