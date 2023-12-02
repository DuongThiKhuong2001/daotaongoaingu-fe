import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-huy',
  templateUrl: './huy.component.html',
  styleUrls: ['./huy.component.css'],
})
export class HuyComponent {
  constructor(public dialogRef: MatDialogRef<HuyComponent>) {}
  closedialog() {
    this.dialogRef.close('no');
  }
  accept() {
    this.dialogRef.close('ok');
  }
}
