import { runInAction, makeAutoObservable } from 'mobx';
import axios, { AxiosError } from 'axios';

export class SearchWeatherStore {
    isLoading = false

    error = ""
    constructor() {
        makeAutoObservable(this)
    }

    async getAll(city: string) {
        this.isLoading = true
        this.error = ""
        try {
            const response = await axios.get(
                "http://api.weatherapi.com/v1/forecast.json",
                {
                    params: {
                        key: process.env.API_KEY || "8d5cf20ef3834464af983614252108",
                        q: city,
                        days: "7"
                    }
                }
            )
            return response.data
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