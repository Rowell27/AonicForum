import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USER_META } from '../../../auth/register/register';
import * as firebase from 'firebase';

export interface CATEGORY_DATA extends USER_META {
    ID: string;
    name: string;
    title: string;
    description: string;
}

@Component({
    selector: 'forum-edit-category-page',
    templateUrl: 'forum-edit-category.html'
})

export class ForumEditCategoryPage {
    
    categoryData = <CATEGORY_DATA> {}
    loginData: USER_META = null;
    ref = firebase.database().ref("category")
    data;
    
    constructor( private router: Router) { 
        this.isLoggedIn();
        // console.info('userdata ' + JSON.stringify(this.loginData) )
    }

    isLoggedIn(){
        this.loginData = JSON.parse(localStorage.getItem("login_data"));        
        if ( !this.loginData ) return;
    }

    // getAllCategoryData(){
    //     this.ref.once('value').then( snapshot => {
    //             this.data = snapshot.val(); 
    //             console.log( "Category List ", this.data );
    //         }, err => console.log( "Error getUserData ", err ));
    // }

    getCategoryData(){
         this.ref
            .child( this.categoryData.ID )
            .once('value').then( snapshot => {
                this.categoryData = snapshot.val(); 
                console.log( "User Data", this.categoryData );
            }, err => console.log( "Error getCategoryData ", err ));
    }

    onClickAddCategory(){
        // if ( this.categoryData.ID ) return; 
        console.log ("onClickAddCategory")

        this.ref.child( this.categoryData.ID )
            .set( this.categoryData, re => {
                alert( "Thread successfully created" );
                this.router.navigate( ['/forum-home'] );
            } );
    }
    
    onClickUpdateCategory(){
        this.ref.child( this.categoryData.ID )
            .update( this.categoryData )
            .then ( re => alert( "Category successfully updated" ),
            err => console.log("Error Update. ", err) );
    }

}