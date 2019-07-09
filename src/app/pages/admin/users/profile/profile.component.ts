import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../models';
import { UserService } from '../../../../services';

@Component({
  selector: 'z-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private users: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.users.getUser(data.id)
            .then(res => this.user = res)
            .finally(() => this.isLoading = false);
      }
    })
    
  }

}
