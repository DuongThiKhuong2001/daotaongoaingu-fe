import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-tom-tat',
  templateUrl: './popup-tom-tat.component.html',
  styleUrls: ['./popup-tom-tat.component.css']
})
export class PopupTomTatComponent  implements OnInit {
  cauHoi!: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<PopupTomTatComponent>
  ) {}

  ngOnInit(): void {
    
  }

  closePopup() {
    this.dialogRef.close();
  }
}

