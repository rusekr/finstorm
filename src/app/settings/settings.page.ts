import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { 
  pricetagsOutline
} from 'ionicons/icons';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonIcon,
  IonItem
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonLabel,
    IonList,
    IonIcon,
    IonItem
  ],
})
export class SettingsPage {
  constructor() {
    addIcons({ 
      pricetagsOutline 
    });
  }

  openCategoriesPage() {

  }
}
