import { NgModule } from '@angular/core';
// import { Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { Fireframe } from './fireframe';
import { Category } from './category';
import { CategoryTest } from './test/category-test';
import { Post } from './post';
import { PostTest } from './test/post-test';
import { User } from './user';
import { UserTest } from './test/user-test';
import { Data } from './data';

/**
 * Withcenter Dev Team Open Account.
 * 
 * @warning Do not change this unless you have right reason.
 */
let firebaseConfig = {
    apiKey: "AIzaSyCV0ovi7fQaOmr8HuIdcf9AI4yEgElkEag",
    authDomain: "aonic-d1606.firebaseapp.com",
    databaseURL: "https://aonic-d1606.firebaseio.com",
    storageBucket: "aonic-d1606.appspot.com",
    messagingSenderId: "329419405941"
};



@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    Storage,
    Fireframe, Category, User, Post, Data,
    CategoryTest, PostTest, UserTest
   ]
})
export class FireModule {}