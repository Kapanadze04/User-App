import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { UsersComponent } from "./users/users.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { UserComponent } from "./users/user/user.component";

const appRoutes: Routes = [
    { path: 'users', component: UsersComponent},
    { path: 'user/:id', component: UserComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
]

@NgModule({

    declarations: [
        PageNotFoundComponent
    ],

    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}