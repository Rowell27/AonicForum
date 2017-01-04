import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USER_META } from '../../auth/register/register';

@Component({
    selector: 'base-nav',
    templateUrl: 'nav.html'
})

export class BaseNav {

    loginData: USER_META = null;

    constructor( private router: Router ) { 
        this.isLoggedIn();
    }

    getUserData(){
        this.loginData = JSON.parse(localStorage.getItem("login_data"));        
    }

    isLoggedIn(){
        this.getUserData();
        if ( !this.loginData ) return;
    }

    onClickLogoutUser(){
        this.getUserData();

        if ( !this.loginData ) return; 
                
        localStorage.removeItem('login_data');
        this.router.navigate( ['/login'] );
    }

}