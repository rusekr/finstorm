import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-category-modal-popup',
  templateUrl: './category-modal-popup.page.html',
  styleUrls: ['./category-modal-popup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CategoryModalPopupPage {

  public name: string = '';

  constructor(private modalController: ModalController) {

  }

  public cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }
  public confirm(): void {
    this.modalController.dismiss({
      name: this.name
    }, 'confirm');
  }

}
