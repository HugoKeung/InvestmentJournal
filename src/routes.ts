import { Routes} from '@angular/router'

import { LoginComponent } from './app/login/login.component';

import { PositionViewComponent } from './app/position-view/position-view.component';

import { PositionUpdateComponent } from './app/position-update/position-update.component';
import { BuyPositionComponent } from './app/position-update/buy-position/buy-position.component';
import { HistoryComponent } from './app/history/history.component';
import { PageNotFoundComponent } from './app/error/page-not-found/page-not-found.component';
import { PositionExpandViewComponent } from './app/position-view/position-expand-view/position-expand-view.component';


export const appRoutes:Routes=[
    {path: 'edit', component: PositionUpdateComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo:'/home', pathMatch: 'full'},
    {path: 'home', component: PositionViewComponent},
    {path: 'history', component: HistoryComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: 'position/:id', component: PositionExpandViewComponent }

]