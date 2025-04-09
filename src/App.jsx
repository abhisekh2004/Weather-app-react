import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-400 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city name"
          className="p-2 rounded-md"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;