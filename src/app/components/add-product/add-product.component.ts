import { Component, OnInit, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';

export interface Hashtag {
	name: string;
}

@Component({
	selector: 'add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
	priceValue = 0;

	constructor(public dialog: MatDialog) {}

	ngOnInit(): void {}

	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	hashtags: Hashtag[] = [];

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		if (value) {
			this.hashtags.push({ name: `#${value}` });
		}

		event.chipInput!.clear();
	}

	remove(hashtag: Hashtag): void {
		const index = this.hashtags.indexOf(hashtag);

		if (index >= 0) {
			this.hashtags.splice(index, 1);
		}
	}

	handleMinus() {
		this.priceValue--;
	}

	handlePlus() {
		this.priceValue++;
	}

	openDialog() {
		this.dialog.open(DialogDataExampleDialog, {});
	}
}

@Component({
	selector: 'dialog-data',
	templateUrl: './dialog-data.html',
	styleUrls: ['./dialog-data.component.scss'],
})
export class DialogDataExampleDialog {
	constructor() {}
}
