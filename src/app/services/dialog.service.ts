import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ComponentType } from "@angular/cdk/portal";
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
}
