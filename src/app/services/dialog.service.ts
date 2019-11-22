import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ComponentType } from "@angular/cdk/portal";
import { ConfirmationDialogComponent } from "@zeal/pages/shared/confirmation-dialog/confirmation-dialog.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  editDialog<T>(id: number, dialog: ComponentType<any>): Observable<T> {
    const dialogRef = this.dialog.open(dialog, {
      panelClass: "modal-dialog-box",
      data: id
    });
    return dialogRef.afterClosed();
  }

  deleteDialog(title: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      data: `Do you confirm the deletion of ${title}`
    });
    return dialogRef.afterClosed();
  }
}
