import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { getString } from "application-settings";
import { alert, LoginService, User, ReadingLog } from "../shared";
import { DatabaseService } from "../database/sqlite.service";

@Component({
	selector: "Groceries",
	moduleId: module.id,
	templateUrl: "./groceries.component.html",
	styleUrls: ['./groceries.component.css']
})
export class GroceriesComponent implements OnInit {
	currentDay: number = new Date().getDate();
	currentMonth: number = new Date().getMonth() + 1;
	currentYear: number = new Date().getFullYear();

	groceryList: Array<Object> = [];
	db: any;
	grocery = "";
	user_id: string;

	readingLogList: Array<ReadingLog> = [];

	readingLog: ReadingLog = new ReadingLog();


	//	@ViewChild("groceryTextField") groceryTextField: ElementRef;

	constructor(
		private routerExtensions: RouterExtensions,
		private userService: LoginService,
		private database: DatabaseService
	) {
		this.user_id = getString("user_id");
	}

	ngOnInit(): void {
	}

	submit() {
		this.add();
	}

	logout() {
		this.userService.logout();
		this.routerExtensions.navigate(["/login"]);
	}

	clearEntries() {
		this.readingLog.date = new Date();
		this.readingLog.title = "";
		this.readingLog.minutes = undefined;
	}

	add() {
		let newReadingLogEntry: ReadingLog = new ReadingLog();
		newReadingLogEntry = { ...this.readingLog };
		this.readingLogList.push(newReadingLogEntry);

		console.log(JSON.stringify(this.readingLogList));

		alert('Entry submitted successfully');
		this.clearEntries();
	}
}