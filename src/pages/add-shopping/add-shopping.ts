import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface'

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;
  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase
  ) {
    this.shoppingItemRef$=this.database.list('shopping-list');
  }

  addShoppingItem() {
    // Create a new object and convert 
    // item number to a number
    // Push this to firebase database under the 'shopping-list' node
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // Reset shopping item
    this.shoppingItem={} as ShoppingItem;

    // Navigate to the shopping list page
    this.navCtrl.pop();
  }

}
