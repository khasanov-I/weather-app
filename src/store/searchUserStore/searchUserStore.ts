import { runInAction, makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

export class SearchUserStore {
    isLoading = false
    users: {name: string, id: number}[] = []
    error = ""
    constructor() {
        makeAutoObservable(this)
    }

    async getAll(name: string) {
        this.isLoading = true
        this.error = ""
        try {
            const response: { name: string; id: number; }[] = []
            runInAction(() => {
                this.users = response
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