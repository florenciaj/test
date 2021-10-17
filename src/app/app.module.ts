import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FeaturedBusinessesComponent } from './components/featured-businesses/featured-businesses.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LogInComponent } from './components/log-in/log-in.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		CartComponent,
		ProductsComponent,
		HomeComponent,
		AddProductComponent,
		FeaturedBusinessesComponent,
		SubscriptionsComponent,
		LogInComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatChipsModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
		MatSelectModule,
		FormsModule,
		MatButtonModule,
		MatDialogModule,
		AppRoutingModule,
		MatCardModule,
		MatDividerModule,
		MatListModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
