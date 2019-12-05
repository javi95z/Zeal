import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { UserService, DialogService } from "@services";
import { User } from "@models";
import { USER_FIELDS } from "@zeal/variables";

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

  constructor(private service: UserService, private dialog: DialogService) {}

  ngOnInit() {
    this.initData();
  }

  private initData(): void {
    this.selection = new SelectionModel<User>(true, []);
    this.service
      .getUsers()
      .then(res => {
        this.dataSource = new MatTableDataSource(res.data);
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

  onAction(action: string, user: User, index: number) {
    switch (action) {
      case "EDIT":
        this.editUser(user, index);
        break;
      case "DELETE":
        this.deleteUser(user, index);
        break;
    }
  }

  /**
   * Show dialog and return updated user
   * Send API request for modification
   * @param user User
   * @param i Table index
   */
  private editUser(user: User, i: number) {
    this.dialog
      .editDialog<User>({
        object: user,
        fields: USER_FIELDS
      })
      .subscribe(result => {
        if (result) {
          this.service.updateUser(new User(user)).then(res => {
            this.dataSource.data[i] = res;
            this.dataSource._updateChangeSubscription();
          });
        }
      });
  }

  /**
   * Confirmation dialog to
   * remove user from table
   * @param u User
   * @param i Index
   */
  private deleteUser(u: User, i: number) {
    const user = new User(u);
    this.dialog.deleteDialog(user.fullName).subscribe(res => {
      if (res) {
        this.service
          .deleteUser(user)
          .then(() => {
            this.dataSource.data.splice(i, 1);
            this.dataSource._updateChangeSubscription();
          })
          .catch(err => console.error(err));
      }
    });
  }
}
