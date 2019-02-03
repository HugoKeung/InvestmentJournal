import 'chart.js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module'
import { AppComponent } from './app.component';
import { BuyPositionComponent } from './position-update/buy-position/buy-position.component';
import { SellPositionComponent } from './position-update/sell-position/sell-position.component';
import { PositionUpdateComponent } from './position-update//position-update.component';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { StockService } from './services/stock.service';
import { SellPositionExpandViewComponent } from './position-view/position-expand-view/sell-position-expand-view/sell-position-expand-view.component';
import { HistoryViewComponent } from './position-view/history-view/history-view.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { UnauthorisedComponent } from './admin/unauthorised/unauthorised.component';
import { ScopeGuard } from './services/scope.guard';


@NgModule({
  declarations: [
    AppComponent,
    BuyPositionComponent,
    SellPositionComponent,
    PositionUpdateComponent,
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
    ChartComponent,
    CallbackComponent,
    AdminComponent,
    UnauthorisedComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
    AuthService,
    ScopeGuard,
    AuthGuard
  //  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
