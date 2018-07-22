import { Component } from '@angular/core';
import {ModalController, NavController, ToastController} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-hi-ionic',
  templateUrl: 'hi-ionic.html'
})
export class HiIonicPage {
  constructor(public navCtrl: NavController,
            private qrScanner: QRScanner) {

  }

  ionViewWillEnter(){
    this.qrScanner.prepare()
   .then((status: QRScannerStatus) => {
     if (status.authorized) {
       console.log('Camera Permission Given');

        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

        console.log('Scanned something', text);
        this.qrScanner.hide();
        scanSub.unsubscribe();

       });

       this.qrScanner.show();
     } else if (status.denied) {
       console.log('Camera permission denied');
     } else {
       console.log('Permission denied for this runtime.');
     }
   })
   .catch((e: any) => console.log('Error is', e));
}

ionViewWillLeave(){
   this.hideCamera();
}

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }





}
