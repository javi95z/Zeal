import { User } from './../../../models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../../services/user.service';
// import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersAdminComponent implements OnInit {

  displayedColumns: string[] = [ 'first_name', 'email' ];
  dataSource: MatTableDataSource<User>;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  users: User[];

  constructor(private serv: UserService) {
  }

  ngOnInit() {
    this.serv.getUsers()
        .then(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
        });

  }

}
