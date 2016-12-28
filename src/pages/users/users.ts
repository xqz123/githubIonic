import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { GithubUsers } from '../../providers/github-users';
import { UserDetailsPage} from '../user-details/user-details';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  users: User[]
  originalUsers: User[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private githubUsers: GithubUsers
     ) {
    githubUsers.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;

    // githubUsers
    //   .searchUsers('scotch').subscribe(users => {
    //     console.log(users)
    //   });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(searchEvent) {
    console.log(searchEvent);
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.users = this.originalUsers;
    } else {
      // Get the searched users from github
      this.githubUsers.searchUsers(term).subscribe(users => {
        this.users = users
      });
    }
  }

}
