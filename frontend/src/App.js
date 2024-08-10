import React, { useState, useContext, createContext } from "react";
import axios from "axios";
import "./App.css";
import PerformanceMetrics, {
  metricsList,
} from "./components/PerformanceMetrics";

const ThemeContext = createContext();

function App() {
  const [url, setUrl] = useState("");
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("dark");

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        url,
      });
      setPerformanceData(response.data);
    } catch (error) {
      setError("Error fetching performance data. Please try again later.");
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App ${theme}`}>
        <header className="App-header">
          <div className="Title-app">
            <h1>SpeedX</h1>
            <button className="theme-toggle Button-1" onClick={toggleTheme}>
              {theme === "dark" ? "Light" : "Dark"} Theme
            </button>
          </div>
          <div className="input-container">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              aria-label="Website URL"
            />
            <button
              aria-label="Analyze performance"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
          <br />
          {error && <p className="error-message">{error}</p>}
          {performanceData && <PerformanceMetrics data={performanceData} />}
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
