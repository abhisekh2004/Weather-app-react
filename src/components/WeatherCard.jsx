function WeatherCard({ data }) {
  const { name, main, weather, wind } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
        className="mx-auto"
      />
      <p className="text-xl">{weather[0].main}</p>
      <p className="text-lg">🌡 {main.temp}°C</p>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>💨 Wind: {wind.speed} km/h</p>
    </div>
  );
}

export default WeatherCard;