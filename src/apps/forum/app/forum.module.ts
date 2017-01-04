import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from '../pages/base/base.module';
import { FireModule } from '../../../fireframe2/fire-module';

import { LoginPage } from '../pages/auth/login/login';
import { RegisterPage } from '../pages/auth/register/register';
import { UserSettingsPage } from '../pages/auth/user-settings/user-settings';
import { ForumHomePage } from '../pages/dashboard/forum-home/forum-home';
import { ForumCategoryPage } from '../pages/dashboard/forum-category/forum-category';
import { ForumEditCategoryPage } from '../pages/dashboard/forum-category/forum-edit-category/forum-edit-category';

const appRoutes: Routes = [
    { path: '', component: LoginPage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'forum-home', component: ForumHomePage },
    { path: 'user-settings', component: UserSettingsPage }, 
    { path: 'forum-category', component: ForumCategoryPage },           
    { path: 'forum-edit-category', component: ForumEditCategoryPage }                                
]

@NgModule({
    declarations: [
        LoginPage,
        RegisterPage,
        UserSettingsPage,
        ForumHomePage,
        ForumCategoryPage,
        ForumEditCategoryPage
    ],
    imports: [
        BrowserModule,
        BaseModule,
        FormsModule,
        FireModule,        
        RouterModule.forChild( appRoutes )
    ],
    providers: [ ]
})

export class ForumModule {}