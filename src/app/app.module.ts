import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module'
import { AppComponent } from './app.component';
import { BuyPositionComponent } from './position-update/buy-position/buy-position.component';
import { SellPositionComponent } from './position-update/sell-position/sell-position.component';
import { PositionUpdateComponent } from './position-update//position-update.component';
import { LoginComponent } from './login/login.component';
import { PositionListViewComponent } from './position-view/position-list-view/position-list-view.component';
import { PositionDetailViewComponent } from './position-view/position-detail-view/position-detail-view.component';
import { BuyPositionExpandViewComponent } from './position-view/position-expand-view/buy-position-expand-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { PositionViewComponent } from './position-view/position-view.component';
import { CollapsibleWellComponent } from './common/collapsible-well/collapsible-well.component';
import { HistoryComponent } from './history/history.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { StockService } from './services/stock.service';
import { SellPositionExpandViewComponent } from './position-view/position-expand-view/sell-position-expand-view/sell-position-expand-view.component';
import { HistoryViewComponent } from './position-view/history-view/history-view.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    BuyPositionComponent,
    SellPositionComponent,
    PositionUpdateComponent,
    LoginComponent,
    PositionListViewComponent,
    PositionDetailViewComponent,
    BuyPositionExpandViewComponent,
    NavbarComponent,
    PositionViewComponent,
    CollapsibleWellComponent,
    HistoryComponent,
    PageNotFoundComponent,
    SellPositionExpandViewComponent,
    HistoryViewComponent,
    ChartComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
