import { runInAction, makeAutoObservable } from 'mobx';

export class UserStore {
  authorized: boolean = false
  loginError = ''

  constructor() {
    makeAutoObservable(this)
    this.initializeAuth()
  }

  async login(username: string, password: string) {
      this.loginError = ""
        if (username === "Admin" && password === "12345") {
          runInAction(() => {
              this.authorized = true
              localStorage.setItem('authorized', String(true))
          })
        } else {
          runInAction(() => {
            this.loginError = "Имя пользователя или пароль введены не верно"
          })
        }
  }

  initializeAuth() {
    const authorized = localStorage.getItem('authorized')
    if (authorized) {
      runInAction(() => {
        this.authorized = !!authorized
      })
    }  
  }

  logout() {
    runInAction(() => {
      this.authorized = false
    })
    localStorage.removeItem('authorized')
  }

}