import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ColorModeContext, useMode } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import RootLayout from "./components/globalLayout/RootLayout";
import ErrorPage from "./pages/Error";
import Home, { loader as statsLoader } from "./pages/Home";
import Login, { action as loginAction } from "./pages/authentication/Login";
import Athletes from "./pages/Athletes";
import Events from "./pages/Events";
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
          path: "login",
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
              loader: statsLoader,
            },
            {
              path: "athletes",
              element: <Athletes />,
            },
            {
              path: "events",
              element: <Events />,
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
