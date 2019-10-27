import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { EditUserDialog } from "./edit-dialog/edit-dialog.component";
import { UserService, ToastService } from "../../../services";
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
    "gender",
    "actions"
  ];
  dataSource = new MatTableDataSource<User>();
  selection: SelectionModel<User>;
  isLoading = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private user: UserService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.selection = new SelectionModel<User>(true, []);
    this.user
      .getUsers()
      .then(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      })
      .finally(() => (this.isLoading = false));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
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
    this.user
      .updateUser(user)
      .then(() => this.onUserUpdated(new User(user)))
      .catch(err => console.error(err));
  }

  /**
   * Remove user from table
   * API request for deletion
   * @param u User
   * @param i Index
   */
  deleteUser(u: User, i: number) {
    this.user
      .deleteUser(u.id)
      .then(() => this.onUserDeleted(new User(u), i))
      .catch(err => console.error(err));
  }

  /**
   * Actions to perform
   * when user is updated
   * @param u User
   */
  onUserUpdated(u: User) {
    this.toast.setMessage(`User ${u.fullName} updated successfully.`);
  }

  /**
   * Actions to perform
   * when user is deleted
   * @param u User
   * @param i Index
   */
  onUserDeleted(u: User, i: number) {
    this.toast.setMessage(`User ${u.fullName} deleted successfully.`);
    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription();
  }
}
