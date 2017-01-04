import { Component } from '@angular/core';

import * as firebase from 'firebase';

import { USER_META } from '../../../auth/register/register';

@Component({
    selector: 'forum-edit-post-page',
    templateUrl: 'forum-edit-post.html'
})

export class ForumEditPostPage {
    
    loginData: USER_META = null;

    constructor() {
        this.isLoggedIn();
    }

    isLoggedIn(){
        this.loginData = JSON.parse(localStorage.getItem("login_data"));
        if ( !this.loginData ) return;
    }

    

}