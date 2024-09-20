import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import "./index.css";
import ThemeProvider from "./utils/theme/ThemeConfig.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingComponent from "./views/components/LoadingComponent.tsx";
import { Toaster } from "sonner";
import { Box } from "@mui/material";



export const ReactLayout = React.memo(() => {
	const [cilent] = useState(new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				refetchOnWindowFocus: false,
			},
		},
	}))
	return <BrowserRouter>
		<Toaster richColors />
		<ThemeProvider>
			<React.Suspense fallback={<LoadingComponent />}>
				<CssBaseline />
				<Box sx={{
					height: "100vh",
					overflow: "hidden",
					width: "100vw",
					background: "white", 
				
				}}>
					<QueryClientProvider client={cilent}>
						<App />
					</QueryClientProvider>
				</Box>
			</React.Suspense>
		</ThemeProvider>
	</BrowserRouter>
})


ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ReactLayout />
	</React.StrictMode>

);
