import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SiteLayout from './components/layout/SiteLayout.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import AdminPolicies from "./pages/AdminPolicies";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Policies from './pages/Policies.jsx';
import PolicyDetails from './pages/PolicyDetails.jsx';
import ComparePolicies from './pages/ComparePolicies.jsx';
import Claims from './pages/Claims.jsx';
import ClaimDetails from './pages/ClaimDetails.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Payments from './pages/Payments.jsx';
import Notifications from './pages/Notifications.jsx';
import Reports from './pages/Reports.jsx';
import Support from './pages/Support.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import Favorites from './pages/Favorites.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import FraudDetection from './pages/FraudDetection.jsx';
import BankAccounts from './pages/BankAccounts.jsx';
import MapServices from './pages/MapServices.jsx';
import VehicleInspection from './pages/VehicleInspection.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminCustomers from "./pages/AdminCustomers";
import { LanguageProvider } from './context/LanguageContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          {/* Public site layout */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/policies/:id" element={<PolicyDetails />} />
            <Route path="/compare" element={<ComparePolicies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/claims/:id" element={<ClaimDetails />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/bank-accounts" element={<BankAccounts />} />
            <Route path="/map-services" element={<MapServices />} />
            <Route path="/vehicle-inspection" element={<VehicleInspection />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Customer dashboard */}
          <Route
            element={
              <ProtectedRoute requireRole="Customer">
                <DashboardLayout role="Customer" />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<CustomerDashboard />} />
          </Route>

          {/* Admin dashboard */}
          <Route
            element={
              <ProtectedRoute requireRole="Admin">
                <DashboardLayout role="Admin" />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/fraud" element={<FraudDetection />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/policies" element={<AdminPolicies />} />
            <Route path="/admin/documents" element={<Support />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}
