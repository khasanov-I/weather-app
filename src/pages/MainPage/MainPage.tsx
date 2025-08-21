import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useStores } from "../../store/rootStore"
import "./styles.css"

export const MainPage = observer(() => {
  const { weatherStore } = useStores();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      weatherStore.getCurrentPositionWeather(
        String(position.coords.latitude),
        String(position.coords.longitude)
      );
    });
  }, [weatherStore]);

  if (!weatherStore.result) {
    return <div className="loading">Загрузка погоды...</div>;
  }

  const { current, location, forecast } = weatherStore.result;

  return (
    <div style={{width: "100%"}} className="compact-weather">
      <div className="current-compact">
        <div className="location-compact">
          <h2>{location.name}</h2>
          <p>{new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}</p>
        </div>
        
        <div className="weather-main">
          <div className="temp-section">
            <div className="current-temp">{Math.round(current.temp_c)}°</div>
            <div className="feels-like">Ощущается как {Math.round(current.feelslike_c)}°</div>
          </div>
          
          <div className="weather-icon">
            <img 
              src={`https:${current.condition.icon}`} 
              alt={current.condition.text} 
            />
          </div>
        </div>

        <div className="weather-details">
          <div className="detail">
            <span className="label">Влажность</span>
            <span className="value">{current.humidity}%</span>
          </div>
          
          <div className="detail">
            <span className="label">Дождь</span>
            <span className="value">
              {forecast.forecastday[0].day.daily_chance_of_rain}%
            </span>
          </div>
        </div>
      </div>

      {/* Прогноз на следующие дни */}
      <div className="forecast-compact">
        {forecast.forecastday.map((day: any) => (
          <div key={day.date} className="forecast-day-compact">
            <div className="forecast-date">
              {new Date(day.date).toLocaleDateString('ru-RU', { 
                weekday: 'short',
                day: 'numeric'
              })}
            </div>
            
            <img 
              src={`https:${day.day.condition.icon}`} 
              alt={day.day.condition.text} 
              className="forecast-icon"
            />
            
            <div className="forecast-temp">{Math.round(day.day.avgtemp_c)}°</div>
            
            <div className="forecast-rain">
              {day.day.daily_chance_of_rain}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});