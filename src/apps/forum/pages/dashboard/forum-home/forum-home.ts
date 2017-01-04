import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { CATEGORY_DATA } from '../forum-category/forum-edit-category/forum-edit-category';
import { User } from '../../../../../fireframe2/user';
import { USER_META } from '../../auth/register/register'

@Component({
    selector: 'forum-home-page',
    templateUrl: 'forum-home.html'
})

export class ForumHomePage implements OnInit {       
    
    categoryData = <CATEGORY_DATA> {}
    loginData: USER_META = null;
    ref = firebase.database().ref( "category" )
    data;

    constructor( private user: User, private router: Router) {
        this.isLoggedIn();
    }
    
    ngOnInit(){
        this.getAllCategoryData();
    }

    getUserData(){
        this.loginData = JSON.parse(localStorage.getItem("login_data"));
        console.info("Username: " , this.loginData );     
    }

    getAllCategoryData(){
        this.ref.once('value').then( snapshot => {
                this.data = snapshot.val(); 
                console.log( "Category List ", this.data );
            }, err => console.log( "Error getUserData ", err ));
    }

    get categories(){
        if ( this.data === void 0 ) return [];
        return Object.keys( this.data );
    }

    isLoggedIn(){
        this.getUserData();
        if ( !this.loginData ) return;
    }

    onClickViewCategory(){
        // this.router.navigate
    }
}