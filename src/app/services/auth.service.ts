import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';

@Injectable()
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}
  path = 'https://localhost:7067/api/auth/';

  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = 'token';
  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'login', loginUser, { responseType: 'text' })
      .subscribe((data) => {
        console.log('data: ', data.toString());
        this.saveToken(data.toString());

        this.decodedToken = this.jwtHelper.decodeToken(data.toString());
        this.alertifyService.success('Giriş yapıldı');
        this.getCurrentUserId();
        this.router.navigateByUrl('/city');
      });
  }
  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'register', registerUser, { headers: headers })
      .subscribe((data) => {});
  }
  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error('Çıkış yapıldı');
  }
  loggedIn() {
    return this.jwtHelper.isTokenExpired(this.token!);
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token!).nameid;
  }
}
