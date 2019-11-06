import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { EditUserDialog } from "./edit-dialog/edit-dialog.component";
import { UserService } from "../../../services";
import { User } from "../../../models";

@Component({
  selector: "z-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersAdminComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "name",
    "email",
    "role",
    "teams",
    "gender",
    "actions"
  ];
  dataSource = new MatTableDataSource<User>();
  selection: SelectionModel<User>;
  isLoading = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initData();
  }

  initData(): void {
    this.selection = new SelectionModel<User>(true, []);
    this.service
      .getUsers()
      .then(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      })
      .finally(() => (this.isLoading = false));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  editUserDialog(user: User) {
    const dialogRef = this.dialog.open(EditUserDialog, {
      panelClass: "modal-dialog-box",
      data: user
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        console.log(result);
        this.updateUser(result);
      }
    });
  }

  /**
   * Update user from table
   * API request for modification
   * @param user User
   */
  updateUser(user: User) {
    this.service
      .updateUser(user)
      .then(() => this.service.onUserUpdated(new User(user)))
      .catch(err => console.error(err));
  }

  /**
   * Remove user from table
   * API request for deletion
   * @param u User
   * @param i Index
   */
  deleteUser(u: User, i: number) {
    this.service
      .deleteUser(u.id)
      .then(() => {
        this.service.onUserDeleted(new User(u));
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      })
      .catch(err => console.error(err));
  }
}
