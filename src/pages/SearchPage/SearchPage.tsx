import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { useStores } from "../../store/rootStore";
import { observer } from "mobx-react-lite";

export const SearchPage = observer(() => {
    const { searchWeatherStore } = useStores()
    const [name, setName] = useState("")
    const [cities, setCities] = useState<any[]>(JSON.parse(localStorage.getItem("cities") || "[]"))

    const onChangeName = useCallback((value: string) => {
        setName(value)
    }, []);

    const handler = useCallback(async (value: string) => {
        const result = await searchWeatherStore.getAll(value)
        setCities(prev => [...prev, result])
    }, [searchWeatherStore])

    useEffect(() => {
        localStorage.setItem("cities", JSON.stringify(cities))
    }, [cities])

    return <Stack width="100%" gap="20px">
        <TextField fullWidth label="Введите название города" value={name} onChange={(event) => onChangeName(event.target.value)} />
        <Button disabled={name === ""} onClick={() => {
            handler(name)
        }}>Добавить город</Button>
        <Grid container>
            {cities.map((e) => {
                const { current, location, forecast } = e;
                return <div key={location.name} className="compact-weather">
                    <div className="current-compact">
                        <div className="location-compact">
                            <Stack direction="row" justifyContent="space-between">
                                <h2>{location.name}</h2>
                                <Button onClick={() => {
                                    setCities(prev => [...prev].filter(c => c.location.lat !== e.location.lat && c.location.lon !== e.location.lon))
                                }}>Удалить</Button>
                            </Stack>
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
            })}
        </Grid>
    </Stack>
})