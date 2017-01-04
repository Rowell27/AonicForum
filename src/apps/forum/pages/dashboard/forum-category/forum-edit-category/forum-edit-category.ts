import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { USER_META } from '../../../auth/register/register';
import * as firebase from 'firebase';

export interface CATEGORY_DATA {
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
    
    category = <CATEGORY_DATA> {}
    loginData: USER_META = null;
    ref = firebase.database().ref("category")
    paramData;
    
    constructor( private router: Router, private routes: ActivatedRoute) { 
        
        this.isLoggedIn();
        this.getCategoryData();
    }

    getParamData(){
        this.routes.params.subscribe( param=>{
            this.paramData = param['id']
        });
        this.category.ID = this.paramData
    }

    isLoggedIn(){
        this.loginData = JSON.parse(localStorage.getItem("login_data"));        
        if ( !this.loginData ) return;
        this.getParamData();
    }

    // getAllCategoryData(){
    //     this.ref.once('value').then( snapshot => {
    //             this.data = snapshot.val(); 
    //             console.log( "Category List ", this.data );
    //         }, err => console.log( "Error getUserData ", err ));
    // }

    getCategoryData(){
        if( !this.category.ID ) return;
        this.ref
            .child( this.category.ID )
            .once('value').then( snapshot => {
                this.category = snapshot.val(); 
                console.log( "Retrieved Category Data", this.category );
            }, err => console.log( "Error getCategoryData ", err ));
    }

    clearAll(){
        this.category = null;
    }

    onClickAddCategory(){
        let data = {
            ID: this.category.ID,
            name: this.category.name,
            title: this.category.title,
            description: this.category.description,
            author: this.loginData.name
        }        
        this.ref.child( this.category.ID )
            .set( data, re => {
                alert( "Category successfully created" );
                this.router.navigate( ['/forum-home'] );
            } );
    }
    
    onClickUpdateCategory(){
        this.ref.child( this.category.ID )
            .update( this.category )
            .then ( re => {
                    alert( "Category successfully updated" );
                    this.clearAll();
                    this.router.navigate( ['/forum-home'] );
                    }, err => console.log("Error Update. ", err) );
    }

    onClickBackToCategory(){
        console.log( "Item to pass (Forum Category) : ", this.category.ID )
        this.router.navigate( ['/forum-category', this.category.ID] );
    }

}