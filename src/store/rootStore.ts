import { createContext, useContext } from "react";
import { UserStore } from "./userStore/userStore";
import { WeatherStore } from "./weatherStore/weatherStore";
import { SearchWeatherStore } from "./searchWeatherStore/searchWeatherStore";

export class RootStore {
    userStore: UserStore
    searchWeatherStore: SearchWeatherStore
    weatherStore: WeatherStore

    constructor() {
        this.userStore = new UserStore()
        this.searchWeatherStore = new SearchWeatherStore()
        this.weatherStore = new WeatherStore()
    }
}

export const rootStore = new RootStore()
export const StoreContext = createContext<RootStore>(rootStore)

export const useStores = () => useContext(StoreContext)