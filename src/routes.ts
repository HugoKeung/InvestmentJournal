import { Routes} from '@angular/router'
import { BuyPositionComponent } from "./app/position-update/buy-position/buy-position.component";
import { LoginComponent } from './app/login/login.component';


export const appRoutes:Routes=[
    {path: 'edit', component: BuyPositionComponent},
    {path: 'login', component: LoginComponent}
]