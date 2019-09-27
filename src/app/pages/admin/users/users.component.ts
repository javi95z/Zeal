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
import {User} from "../../../models";

@Component({
  selector: "z-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersAdminComponent implements OnInit {
  displayedColumns: string[] = ["select", "name", "email", "role", "gender"];
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

  editUserDialog() {
    if (this.selection.selected.length !== 1) {
      return null;
    }
    const dialogRef = this.dialog.open(EditUserDialog, {
      panelClass: "modal-dialog-box",
      data: this.selection.selected[0]
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
    const id = this.selection.selected
      .reduce((r, o) => r.concat(o.id), [])
      .toString();
    this.user
      .updateUser(id, user)
      .then(() => this.onUserUpdated(`${user.first_name} ${user.last_name}`))
      .catch(err => console.error(err));
  }

  /**
   * Remove user from table
   * API request for deletion
   */
  deleteUser() {
    const id = this.selection.selected
      .reduce((r, o) => r.concat(o.id), [])
      .toString();
    const name = this.selection.selected
      .reduce((r, o) => r.concat(`${o.first_name} ${o.last_name}`), [])
      .toString();
    this.user
      .deleteUser(id)
      .then(() => this.onUserDeleted(name))
      .catch(err => console.error(err));
  }

  onUserUpdated(name: string) {
    this.toast.setMessage(`User ${name} updated successfully.`);
    this.initData();
  }

  onUserDeleted(name: string) {
    this.toast.setMessage(`User ${name} deleted successfully.`);
    this.initData();
  }
}
