import { Toaster } from "react-hot-toast";
import SearchBoardInput from "./components/SearchBoardInput";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster
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
      />
      <SearchBoardInput />
    </ThemeProvider>
  );
}

export default App;
