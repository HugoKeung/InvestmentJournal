import { Routes} from '@angular/router'

import { PositionViewComponent } from './app/position-view/position-view.component';

import { PositionUpdateComponent } from './app/position-update/position-update.component';
import { HistoryComponent } from './app/history/history.component';
import { PageNotFoundComponent } from './app/error/page-not-found/page-not-found.component';
import { BuyPositionExpandViewComponent } from './app/position-view/position-expand-view/buy-position-expand-view.component';
import { SellPositionExpandViewComponent } from './app/position-view/position-expand-view/sell-position-expand-view/sell-position-expand-view.component';
import { CallbackComponent } from './app/callback/callback.component';
import { AdminComponent } from './app/admin/admin.component';
import { AuthGuard } from './app/services/auth.guard';


export const appRoutes:Routes=[
    {path: 'edit', component: PositionUpdateComponent},
    {path: '', redirectTo:'/home', pathMatch: 'full'},
    {path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
    {path: 'home', component: PositionViewComponent},
    {path: 'history', component: HistoryComponent, canActivate:[AuthGuard]},
    {path: 'callback', component: CallbackComponent},
    {path: 'position/buy/:id', component: BuyPositionExpandViewComponent },
    {path: 'position/sell/:id', component: SellPositionExpandViewComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo:'/404'}

]