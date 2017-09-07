import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase
  ) {

    // Capture shoppingItemId as a navParamater
    const shoppingItemId=this.navParams.get('shoppingItemId');
    
    this.shoppingItemRef$=this.database.object(`shopping-list/${shoppingItemId}`)

    // Subscribe to the Object and assign the result to
    // this.shoppingItem
    this.shoppingItemSubscription =
      this.shoppingItemRef$.subscribe(
        shoppingItem => this.shoppingItem=shoppingItem
      );
  }

  
  EditShoppingItemPage(shoppingItem: ShoppingItem){
    // Update our firebase node with updated data
    this.shoppingItemRef$.update(shoppingItem);

    // Send the user back to Shopping list page
    this.navCtrl.pop();
  }

  // Unsubscribe from the observable when leaving page
  ionViewWillLeave() {
    this.shoppingItemSubscription.unsubscribe();
  }

}
