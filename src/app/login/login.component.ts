import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  private login: string;
  private senha: string;

  constructor(private authService: AuthService, private router: Router) {
    this.login = "";
    this.senha = "";
  }

  ngOnInit() {}

  doLogin(): void {
    //TODO: start loading service

    this.authService.doLogin(this.login, this.senha).subscribe(
      response => {
        this.authService.setToken(response["token"]);
        this.router.navigate(["/"]);
        //TODO: toast service with response.message
      },
      error => {
        //TODO: toast service with error.message
      }
      //, TODO: end loading service
    );
  }
}
