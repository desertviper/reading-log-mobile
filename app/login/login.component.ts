import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { setString } from "application-settings";
import { alert, LoginService, User } from "../shared";

@Component({
	selector: "Login",
	moduleId: module.id,
	templateUrl: "./login.component.html",
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user: User;

	constructor(
		private router: Router,
		private routerExtensions: RouterExtensions,
		private page: Page,
		private userService: LoginService,
	) {
		this.user = new User();
	}

	ngOnInit() {
		this.page.actionBarHidden = true;
	}

	submit() {
		this.routerExtensions.navigate(["/"], { clearHistory: true });
//		this.signUp();
	}

	login() {
		this.userService.login(this.user)
			.then(status => {
				setString("user_id", this.user.email);
				this.routerExtensions.navigate(["/"], { clearHistory: true });
			}, err => {
				this.clearFields();
				alert("Unfortunately we could not find your account.");
			});
	}

	signUp() {
		this.userService.register(this.user)
			.then(status => {
				alert("Your account was successfully created.");
				this.routerExtensions.navigate(["/"], { clearHistory: true });
			}, err => {
				this.clearFields();
				alert("Unfortunately we were unable to create your account.")
			});
	}

	clearFields() {
		this.user.email = '';
		//		this.user.password = '';
	}

}