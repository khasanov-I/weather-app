import { createContext, useContext } from "react";
import { UserStore } from "./userStore/userStore";
import { SearchUserStore } from "./searchUserStore/searchUserStore";

export class RootStore {
    userStore: UserStore
    searchUserStore: SearchUserStore

    constructor() {
        this.userStore = new UserStore()
        this.searchUserStore = new SearchUserStore()
    }
}

export const rootStore = new RootStore()
export const StoreContext = createContext<RootStore>(rootStore)

export const useStores = () => useContext(StoreContext)