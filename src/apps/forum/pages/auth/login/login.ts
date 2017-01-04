import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';   

import { User, USER_DATA } from '../../../../../fireframe2/user';
import { USER_META } from '../../auth/register/register';

@Component ({
    selector: 'login-page',
    templateUrl: 'login.html'
})

export class LoginPage {

    userData = <USER_META> {};
    loginData: USER_META = null;
    ref = firebase.database().ref("users")
    key: string;
    data = {};

    constructor( private user: User, private router: Router ) {
        this.isLoggedIn();
     }  

    isLoggedIn(){
        this.loginData = JSON.parse( localStorage.getItem("login_data") );
        if ( !this.loginData ) return;
        alert ( "Already logged in as " + this.loginData.email );
        this.router.navigate( ['/forum-home'] );
    }

    // validateForm(){
    //     this.ref
    //         .child( this.key )
    //         .once('value').then( snapshot => {
    //             this.userData = snapshot.val(); 
    //             console.log( "User Data", this.userData );
    //         }, err => console.log( "Error getUserData ", err ));
    // }


    getUserData( successCallback, failureCallback ){
        if ( !this.key ) this.key = this.loginData.uid;
        
        console.log("This user's UID: ", this.key );
        this.ref
            .child( this.key )
            .once('value').then( snapshot => {
                this.userData = snapshot.val(); 
                successCallback( this.userData )
                console.log( "User Data", this.userData );
            }, err => failureCallback( err ) );
    }

    onClickLoginUser(){
        this.user
            .set( 'email', this.userData.email )
            .set( 'password', this.userData.password )
            .login( authData => {
                
                this.key = authData.uid;
                
                this.getUserData( userData => {
                        this.data = {
                        name: this.userData.name,
                        email: this.userData.email,
                        uid: this.key
                    }

                    console.log("Data to be stored on cache  ", this.data)
                    localStorage.setItem( 'login_data', JSON.stringify( this.data ) );
                    this.loginData = JSON.parse( localStorage.getItem( 'login_data' ) );                       
                    this.router.navigate( ['/forum-home'] ); 
                }, error=> alert( "Unable to get user data" + error) );
                
            }, err => console.log(err));            
    }
}