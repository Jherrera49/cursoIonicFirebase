import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { AlertController } from '@ionic/angular'
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private dataBase: AngularFirestore,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  DBRef = this.dataBase.collection('rooms')

  readRooms(){
    return this.DBRef.snapshotChanges().pipe(map(rooms => {
      return rooms.map(room => {
        const data = room.payload.doc.data()
        const id = room.payload.doc.id;
        return {id,...(data as object)}
      })
    }))
  }

  createRoom(name:string){
    this.DBRef.add({
      name: name,
      status: true
    }).then(() => {
     this.showToast('Room creado con éxito.', 'success')
    }).catch(err => console.log(err.message))
  }

  updateRooms(id:string, name:string){
    this.DBRef.doc(id).update({
      name: name
    }).then(() => {
      this.showToast('Room actualizado con éxito.', 'success')
     }).catch(err => console.log(err.message))
  }

  deleteRooms(id:string){
    this.DBRef.doc(id).delete().then(() => {
      this.showToast('Room eliminado con éxito', 'success')
    }).catch(err  => console.log(err.message))
  }

  async AddRoomAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add New Room',
      inputs: [
        {
          name: 'nameRoom',
          type: 'text',
          placeholder: 'Name Room'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            this.createRoom(name.nameRoom)
          }
        }
      ]
    });

    await alert.present();
  }

  async updateRoomAlert(id:string, name:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update Room',
      inputs: [
        {
          name: 'nameRoom',
          type: 'text',
          value: name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            this.updateRooms(id,name.nameRoom)
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message:string, color:string){
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    })
    toast.present()
  }
}
