import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, USER_DATA } from '../../../../../fireframe2/user';
import * as firebase from 'firebase';

export interface USER_META extends USER_DATA {
    name: string;
    mobile: string;
    address: string;
}

@Component ({
    selector: 'register-page',
    templateUrl: 'register.html'
})

export class RegisterPage {

    userData = <USER_META> {}
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
        this.getUserData( () => {}, error => console.log( error ));
    }
    

    onClickRegisterUser(){
        this.user
            .sets( this.userData )
            .create( () => {
                alert( "Account  " + this.userData.email + "  is successfully registered." );

                this.user
                    .sets( this.userData )
                    .login( authData => {
                        this.key = authData.uid;

                        delete this.userData.password;
                        this.ref.child( this.key )
                            .set( this.userData, re => console.log("successfully pushed data", this.userData ) ); 
                             
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

                        }, err=> alert('Registration failed') );
                    }, err => console.log("Registration failed. " , err) );
    }

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

    onClickUpdateUser(){
        let key =  this.loginData.uid;
        console.log( "This user's key to update: " , key );
        this.ref.child( key )
            .update( this.userData )
            .then ( re => {
                    alert( "Account successfully updated" );

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
                 }, err => console.log("Error Update. ", err) );
    }

}   