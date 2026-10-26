import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonSelect, IonSelectOption,
  IonButton, IonList, IonItem, IonItemSliding,
  IonItemOptions, IonItemOption, IonLabel, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { walletOutline, addCircleOutline, trashOutline } from 'ionicons/icons';

interface Harcama {
  isim: string;
  fiyat: number;
  kategori: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar,
    IonTitle, IonContent, IonInput, IonSelect,
    IonSelectOption, IonButton, IonList, IonItem,
    IonItemSliding, IonItemOptions, IonItemOption, IonLabel, IonIcon
  ],
})
export class HomePage implements OnInit {
  liste: Harcama[] = [];
  isim: string = "";
  fiyat: number | null = null;
  kategori: string = "";
  toplam: number = 0;

  constructor() {
    // Kullanılan ikonları sisteme yüklüyoruz
    addIcons({ walletOutline, addCircleOutline, trashOutline });
  }

  ngOnInit() {
    this.verileriYukle();
  }

  ekle() {
    if (this.isim && this.fiyat && this.kategori) {
      this.liste.push({
        isim: this.isim,
        fiyat: Number(this.fiyat),
        kategori: this.kategori
      });

      this.guncelle();

      this.isim = "";
      this.fiyat = null;
      this.kategori = "";
    }
  }

  sil(index: number) {
    this.liste.splice(index, 1);
    this.guncelle();
  }

  guncelle() {
    this.toplam = 0;
    this.liste.forEach(h => this.toplam += Number(h.fiyat));
    localStorage.setItem('harcamalar_data', JSON.stringify(this.liste));
  }

  verileriYukle() {
    const data = localStorage.getItem('harcamalar_data');
    if (data) {
      this.liste = JSON.parse(data);
      this.guncelle();
    }
  }
}