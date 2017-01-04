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
    
    loginData: USER_META = null;
    ref = firebase.database().ref( "category" )
    list_category;

    constructor( private user: User, private router: Router) {
        this.isLoggedIn();
    }
    
    ngOnInit(){
        this.getAllCategoryData();
    }

    isLoggedIn(){
        this.loginData = JSON.parse(localStorage.getItem("login_data"));
        if ( !this.loginData ) return;
    }

    getAllCategoryData(){
        this.ref.once('value').then( snapshot => {
                this.list_category = snapshot.val(); 
                console.log( "Category List ", this.categories );
            }, err => console.log( "Error getAllCategoryData ", err ));
    }

    get categories(){
        if ( this.list_category === void 0 ) return [];
        return Object.keys( this.list_category );
    }
    
    onClickViewCategory(id : string){       
        this.router.navigate( ['/forum-category', id] );
    }
}