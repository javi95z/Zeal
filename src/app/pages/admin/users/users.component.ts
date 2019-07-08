import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../../../models';
import { UserService } from '../../../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersAdminComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'email', 'gender'];
  dataSource = new MatTableDataSource<User>();
  selection: SelectionModel<User>;
  isLoading = true;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.selection = new SelectionModel<User>(true, []);
    this.user.getUsers()
      .then(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
      })
      .finally(() => this.isLoading = false);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  deleteUser() {
    const id = this.selection.selected.reduce((r, o) => r.concat(o.id), []).toString();
    this.user.deleteUser(id)
        .then(() => this.initData())
        .catch(err => console.error(err));
  }

}
