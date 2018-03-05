import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TeamProvider } from '../../providers/team/team';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: string = 'HomePage';
  tab2Root: string = 'TeamPage';
  tab3Root: string = 'TeamsPage';
  isAdmin: boolean = false;
  isClient: boolean = false;
  constructor(public teamProvider: TeamProvider) {}

  ionViewDidLoad() {
    //Loading Tab for Client
    this.teamProvider.getClientStatus().then(clientStatus => {
      this.isClient = clientStatus;
    });
    // Loading Tab for Admin
    this.teamProvider.getAdminStatus().then(adminStatus => {
      this.isAdmin = adminStatus;
    });
  }
}
