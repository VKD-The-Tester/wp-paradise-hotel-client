import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import LoginPage from "./pages/auth/login/LoginPage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import RoomSearchPage from "./pages/rooms/RoomSearchPage";
import MyReservationsPage from "./pages/reservations/myReservationsPage";
import AdminDashboardPage from "./pages/admin/dashboard/AdminDashboardPage";
import AdminReservationsPage from "./pages/admin/reservations/AdminReservationsPage";
import AdminLocationsPage from "./pages/admin/locations/AdminLocationsPage";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<MainLayout />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/rooms" element={<RoomSearchPage />} />
        <Route path="/my-reservations" element={<MyReservationsPage />} />

        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/reservations" element={<AdminReservationsPage />} />
        <Route path="/admin/locations" element={<AdminLocationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
