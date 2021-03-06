import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { USER_META } from '../../auth/register/register';
import { CATEGORY_DATA } from '../forum-category/forum-edit-category/forum-edit-category';

@Component({
    selector: 'forum-category-page',
    templateUrl: 'forum-category.html'
})

export class ForumCategoryPage {

    category = <CATEGORY_DATA> {}
    loginData: USER_META = null;
    ref = firebase.database().ref( "category" )
    category_ID: string;

    constructor( private routes: ActivatedRoute, private router: Router ) {
        this.isLoggedIn();
        this.getCategoryData();
    }

    getParamData(){
        this.routes.params.subscribe( param=>{
            this.category.ID = param['id']
        });
    }

    isLoggedIn(){
        this.loginData = JSON.parse( localStorage.getItem("login_data") );
        if ( !this.loginData ) return;
        this.getParamData();
    }

    getCategoryData(){
        this.ref
            .child( this.category.ID )
            .once('value').then( snapshot => {
                this.category = snapshot.val(); 
                console.log( "User Data", this.category );
            }, err => console.log( "Error getUserData ", err ));
    }

    onClickDeleteCategory(){
        this.ref
            .child( this.category.ID )
            .remove( re => {
                alert( "Category successfully deleted." );
                this.router.navigate( ['/forum-home'] );
            });
    }

    onClickViewEditCategory( ){
        console.log( "Item to pass (Forum Edit Category) : ", this.category.ID )
        this.router.navigate( ['/forum-edit-category', this.category.ID] );
    }

}