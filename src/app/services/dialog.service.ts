import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "@core/components/confirmation-dialog/confirmation-dialog.component";
import { EditDialogComponent } from "@core/components/edit-dialog/edit-dialog.component";
import { Field } from "@models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  editDialog<T>(data: {
    fields: Field[];
    object?: any;
    nameResource?: string;
  }): Observable<T> {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      panelClass: "modal-dialog-box",
      data: data,
    });
    return dialogRef.afterClosed();
  }

  deleteDialog(title?: string, altText?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      data:
        altText || `Are you sure you want to delete ${title || "this item"}?`,
    });
    return dialogRef.afterClosed();
  }

  confirmDialog(text: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      data: text,
    });
    return dialogRef.afterClosed();
  }
}
