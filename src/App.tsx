import { Outlet, useRoutes } from "react-router-dom";
import React, { lazy, useMemo } from "react";

import PlainLayout from "./views/layouts/PlainLayout";
import AuthLayout from "./views/layouts/AuthLayout";

// auth
const Login = lazy(() => import("./views/pages/auth/login"));
const ForgotPassword = lazy(() => import("./views/pages/auth/forgot-password"));
const ResetPassWord = lazy(() => import("./views/pages/auth/reset-password"));
const VerifyOtp = lazy(() => import("./views/pages/auth/verify-otp"));
//Task
const TaskList = lazy(() => import("./views/pages/task/list"));
const TaskView = lazy(() => import("./views/pages/task/view"));
const TaskEdit = lazy(() => import("./views/pages/task/edit"));
const TaskCreate = lazy(() => import("./views/pages/task/create"));

//Profile
const Profile = lazy(() => import("./views/pages/profile/view"));

const App = React.memo(() => {
	const memoRoutes = useMemo(() => ([
		{
			path: "/auth",
			element: (
				<PlainLayout>
					<Outlet />
				</PlainLayout>
			),
			children: [
				{
					index: true,
					element: <Login />,
				},
				{
					path: "login",
					element: <Login />,
				},
				{
					path: "forgot-password",
					element: <ForgotPassword />,
				},
				{
					path: "reset-password",
					element: <ResetPassWord />,
				},
				{
					path: "verify-otp",
					element: <VerifyOtp />,
				},
			],
		},
		{
			path: "/",
			element: (
				<AuthLayout>
					<Outlet />
				</AuthLayout>
			),
			children: [
				{
					index: true,
					element: <TaskList />,
				},
				{
					path: "task",
					element: <TaskList />,
				},
				{
					path: "task/create",
					element: <TaskCreate />,
				},
				{
					path: "task/edit/:id",
					element: <TaskEdit />,
				},
				{
					path: "task/view/:id",
					element: <TaskView />,
				},
				{
					path: "profile",
					element: <Profile />,
				},
			],
		},
	]), [])
	const routes = useRoutes(memoRoutes);
	return routes;
})

export default App;
