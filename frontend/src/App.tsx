import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ColorModeContext, useMode } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import RootLayout from "./components/globalLayout/RootLayout";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Login, { action as loginAction } from "./pages/authentication/Login";
function App() {
  const { theme, colorMode } = useMode();
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Navigate to="login" replace />,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "admin",
          element: <RootLayout />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
