import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping'

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.shoppingItemRef$=this.database.list('shopping-list');
    
  }

 

  navigateToAddShoppingPage() {
    this.navCtrl.push(AddShoppingPage);
  }

  selectShoppingItem(shoppingItem: ShoppingItem){
    /*
      Display an ActionSheet that gives the user 
      the following options:

      1. Edit the ShoppingItem
      2. Delete the ShoopingItem
      3. Cancel selection
    */

    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditShoppingItemPage,
            { shoppingItemId: shoppingItem.$key})
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingItemRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('The user selected the cancel button');
          }
        }
      ]
    }).present();
  }

}
