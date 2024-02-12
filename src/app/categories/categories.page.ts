import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  addOutline
} from 'ionicons/icons';
import { 
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton, 
  IonHeader, 
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle, 
  IonToolbar,
  ModalController 
} from '@ionic/angular/standalone';

import { DatabaseService } from '../services/database.service';
import { CategoryModalPopupPage } from '../category-modal-popup/category-modal-popup.page';
import { Category } from '../models/database.interface';
import { Tab3Page } from '../tab3/tab3.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent, 
    IonFab,
    IonFabButton,
    IonHeader, 
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule
  ]
})
export class CategoriesPage {

  public tab3page = Tab3Page;

  // работа с транзакциями
  public categories: Category[];

  constructor(public databaseService: DatabaseService, private categoryModalCtrl: ModalController) {
    this.categories = databaseService.getCategories();

    addIcons({
      addOutline
    });
  }

  // для оптимизации треканья транзакций т.к. их будут тонны
  trackCategories(index: number, categoryObject: any) {
    return categoryObject.id;
  }


  async openCategoryModal (category: any) {
    const modal = await this.categoryModalCtrl.create({
      component: CategoryModalPopupPage,
      componentProps: {
        name: category ? category.name : ''
      }
    });

    modal.onDidDismiss().then(async (modalEvent) => {
      if (modalEvent === null || !modalEvent.data) return;

      const newCategory: Category = modalEvent.data;
      if (!category) {
        // добавляем транзакцию
        this.databaseService.addCategory(newCategory);
        // после добавления транзакции сохраняем все транзакции в сторадже
        await this.databaseService.saveCategories();
      } else {
        // TODO: проверка на уникальность имени? на одном уровне (когда будет дерево)?
        category.name = newCategory.name;
        // после редактирования транзакции сохраняем все транзакции в сторадже
        await this.databaseService.saveCategories();
      }
    });
    return await modal.present();
  }

  async deleteCategory (index: number) {
    this.databaseService.deleteCategory(index);
    await this.databaseService.saveCategories();
  }


}
