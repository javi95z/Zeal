import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmationDialogComponent } from "@core/components/confirmation-dialog/confirmation-dialog.component";
import { EditDialogComponent } from "@core/components/edit-dialog/edit-dialog.component";
import { Field } from "@zeal/variables";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  editDialog<T>(data: { object: any; fields: Field[] }): Observable<T> {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      panelClass: "modal-dialog-box",
      data: data
    });
    return dialogRef.afterClosed();
  }

  /**
   * TODO: To be replaced by the one above
   */
  editDialogOld<T>(id: number, dialog: any): Observable<T> {
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
