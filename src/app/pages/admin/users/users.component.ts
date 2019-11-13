import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { EditUserDialog } from "./edit-dialog/edit-dialog.component";
import { ConfirmationDialogComponent } from "../../shared";
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
    private service: UserService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initData();
  }

  private initData(): void {
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

  editUserDialog(user: User, i: number) {
    const dialogRef = this.dialog.open(EditUserDialog, {
      panelClass: "modal-dialog-box",
      data: user
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.updateUser(result, i);
      }
    });
  }

  /**
   * Update user from table
   * API request for modification
   * @param user User
   */
  updateUser(user: User, i: number) {
    this.service
      .updateUser(new User(user))
      .then(res => {
        this.dataSource.data[i] = res;
        this.dataSource._updateChangeSubscription();
        this.toast.setMessage(`User ${user.fullName} updated successfully.`);
      })
      .catch(err => console.error(err));
  }

  onAction(action: string, user: User, index: number) {
    switch (action) {
      case "EDIT":
        this.editUserDialog(user, index);
        break;
      case "DELETE":
        this.deleteUserDialog(user, index);
        break;
    }
  }

  /**
   * Confirmation dialog to
   * remove user from table
   * @param user User
   * @param i Index
   */
  deleteUserDialog(u: User, i: number) {
    const user = new User(u);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      data: `Do you confirm the deletion of ${user.fullName}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // API request for deletion
        this.service
          .deleteUser(user.id)
          .then(() => {
            this.dataSource.data.splice(i, 1);
            this.dataSource._updateChangeSubscription();
            this.toast.setMessage(
              `User ${user.fullName} deleted successfully.`
            );
          })
          .catch(err => console.error(err));
      }
    });
  }
}
