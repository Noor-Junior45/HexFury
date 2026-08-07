import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import CalendarPage from '@/pages/CalendarPage';
import DayPage from '@/pages/DayPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/day/:day" element={<DayPage />} />
      <Route path="/day" element={<Navigate to="/day/12" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
