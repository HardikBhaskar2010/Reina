import React from "react";
import Routes from "./Routes";
import { ThemeProvider } from "./components/ui/ThemeToggle";
import { ToastProvider } from "./components/ui/Toast";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
