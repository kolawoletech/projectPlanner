import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TeamProvider } from '../../providers/team/team';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isAdmin: boolean = false;
  isClient: boolean = false;
  adminTaskList: Observable<any>;
  memberTaskList: Observable<any>;
  userProfile: Observable<any>;
  teamId: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public teamProvider: TeamProvider
  ) {}

  ionViewDidLoad() {
    this.teamProvider.getClientStatus().then(clientStatus => {
      this.isClient = clientStatus;
    });

    this.teamProvider.getAdminStatus().then(adminStatus => {
      this.isAdmin = adminStatus;
    });

    this.userProfile = this.teamProvider.getUserProfile().valueChanges();
    // This Page determine content of home page tab
    //I change to client viewing all tabs
    /*
      TODO: To create Admin's View, To Assign Tasks, But Also Clients Allow Them to Add Notes To 
      Tasks But Can't Edit.
    */
    this.userProfile.subscribe(profileSnapshot => {
      this.teamId = profileSnapshot.teamId;
      if (this.isClient) {
        this.adminTaskList = this.teamProvider
          .getTaskList(profileSnapshot.teamId)
          .valueChanges();
      } else {
        this.memberTaskList = this.teamProvider
          .getMemberTaskList(profileSnapshot.teamId, profileSnapshot.id)
          .valueChanges();
      }
    });
  }

  goToTaskCreate(): void {
    this.navCtrl.push('TaskCreatePage');
  }

  completeTask(taskId: string): void {
    let confirm = this.alertCtrl.create({
      title: 'Are you done?',
      message: 'Hit OK to mark this task as completed.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.teamProvider.completeTask(this.teamId, taskId);
          }
        }
      ]
    });
    confirm.present();
  }
}
