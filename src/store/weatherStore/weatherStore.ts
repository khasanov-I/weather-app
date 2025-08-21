import axios, { AxiosError } from 'axios';
import { runInAction, makeAutoObservable } from 'mobx';

export class WeatherStore {
  result: any = undefined
  error = ''
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  async getCurrentPositionWeather(latitude: string, longitude: string) {
    this.error = ""
    this.isLoading = true
    try {
      const response = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json",
        {
          params: {
            key: process.env.API_KEY || "8d5cf20ef3834464af983614252108",
            q: `${latitude},${longitude}`,
            days: "7"
          }
        }
      )
      runInAction(() => {
        this.result = response.data
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        this.error = err?.response?.data.message
      } else {
        this.error = "Неизвестная ошибка"
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}