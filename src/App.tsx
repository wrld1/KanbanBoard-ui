// import { Toaster } from "react-hot-toast";
import { Toaster } from "@/components/ui/toaster";

import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider } from "react-router-dom";
import routerRoot from "./routes/root";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* <Toaster
        toastOptions={{
          success: {
            style: {
              border: "1px solid green",
            },
          },
          error: {
            style: {
              border: "1px solid red",
            },
          },
        }}
      /> */}
      <Toaster />
      <RouterProvider
        router={routerRoot}
        fallbackElement={
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        }
      />
    </ThemeProvider>
  );
}

export default App;
