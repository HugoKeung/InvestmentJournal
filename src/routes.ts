import { Routes} from '@angular/router'

import { LoginComponent } from './app/login/login.component';
import { PositionListViewComponent } from './app/position-view/position-list-view/position-list-view.component';
import { PositionViewComponent } from './app/position-view/position-view.component';
import { BuyPositionComponent } from './app/position-update/buy-position/buy-position.component';


export const appRoutes:Routes=[
    {path: 'edit', component: BuyPositionComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo:'/home', pathMatch: 'full'},
    {path: 'home', component: PositionViewComponent}

]