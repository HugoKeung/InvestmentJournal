import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BuyPositionComponent } from './position-update/buy-position/buy-position.component';
import { SellPositionComponent } from './position-update/sell-position/sell-position.component';
import { PositionUpdateComponent } from './position-update//position-update.component';
import { LoginComponent } from './login/login.component';
import { PositionListViewComponent } from './position-view/position-list-view/position-list-view.component';
import { PositionDetailViewComponent } from './position-view/position-detail-view/position-detail-view.component';
import { PositionExpandViewComponent } from './position-view/position-expand-view/position-expand-view.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    BuyPositionComponent,
    SellPositionComponent,
    PositionUpdateComponent,
    LoginComponent,
    PositionListViewComponent,
    PositionDetailViewComponent,
    PositionExpandViewComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
