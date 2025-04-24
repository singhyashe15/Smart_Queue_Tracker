import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from '../pages/register.jsx';
import Login from '../pages/login.jsx';
import Home from '../pages/home.jsx';
import Admin from '../pages/admin.jsx';
import Appointment from '../components/user/appointment.jsx';
import ViewSchedule from '../components/user/viewSchedule.jsx';
import ViewStatus from '../components/user/viewStatus.jsx';
import AdminComponent from '../components/admin/adminComponent.jsx';
import ProtectedRoute from '../components/protectedRoute.jsx';
import ProtectedAdminRoute from '../components/protectedAdmin.jsx';
import NotFound from '../pages/notFound.jsx';
import Error from '../pages/error.jsx';
import ViewApplicant from '../components/admin/viewApplicant.jsx';
import Logout from '../components/logout.jsx';
import Dashboard from '../components/admin/dashboard.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <Error />
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: 'logout',
    element: <Logout />,
    errorElement: <Error />
  },
  {
    path: 'home',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: 'admin',
    element: <Admin />,
    errorElement: <Error />
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />
  },
  {
    path: 'appointment/:organisation',
    element: (
      <ProtectedRoute>
        <Appointment />
      </ProtectedRoute>
    ),
    errorElement: <Error />
  },
  {
    path: 'viewSchedule/:orgs',
    element: (
      <ProtectedRoute>
        <ViewSchedule />
      </ProtectedRoute>),
    errorElement: <Error />
  },
  {
    path: 'viewStatus',
    element: (
      <ProtectedRoute>
        <ViewStatus />
      </ProtectedRoute>
    ),
    errorElement: <Error />
  },
  {
    path: '/appointment/:organisation',
    element: (
      <ProtectedRoute>
        <Appointment />
      </ProtectedRoute>
    ),
    errorElement: <Error />
  },
  {
    path: '/viewSchedule',
    element: (
      <ProtectedRoute>
        <ViewSchedule />
      </ProtectedRoute>
    ),
    errorElement: <Error />
  },
  {
    path: '/adminView',
    element: (
      <ProtectedAdminRoute>
        <AdminComponent />
      </ProtectedAdminRoute>
    ),
    errorElement: <Error />
  },
  {
    path: '/viewApplicant/:organisation/:department',
    element: (
      <ProtectedAdminRoute>
        <ViewApplicant />
      </ProtectedAdminRoute>
    )
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
