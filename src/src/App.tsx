import { BrowserRouter as Router } from "react-router-dom"
import RouteComponent from "./routes"
import Footer from "./components/Footer"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Toaster } from "sonner"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" duration={2000} />
        <div className="h-screen dark:bg-gray-900 dark:text-white dark:border-gray-700">
          <RouteComponent />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
