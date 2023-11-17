import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LopHocService } from 'src/app/services/lop-hoc.service';

@Component({
  selector: 'app-delete-class',
  templateUrl: './delete-class.component.html',
  styleUrls: ['./delete-class.component.css'],
})
export class DeleteClassComponent {
  maLopHoc: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { maLopHoc: number },
    public dialogRef: MatDialogRef<DeleteClassComponent>,
    private router: Router,
    private toastr: ToastrService,
    private lopHocService: LopHocService
  ) {
    console.log('maLopHoc:', data.maLopHoc);
    this.maLopHoc = data.maLopHoc; // Initialize maLoaiLop from the data passed to the dialog
  }

  closedialog() {
    this.dialogRef.close('Closed using function');
  }

  accept() {
    // Call the API service to delete the type class
  this.lopHocService.xoaLopHoc(this.maLopHoc).subscribe({
    next: (data: any) => {
      if (data.message && data.message === 'cant-delete') {
        // Xử lý trường hợp không thể xóa
        this.toastr.warning('Không thể xóa lớp học này.');
      } else {
        // Xử lý các trường hợp khác hoặc lỗi
        this.toastr.success('Bạn đã xóa thành công!');
        this.dialogRef.close('accept');
      }
    },
    error: (err) => {
      if (err.status === 409) {
        // Handle the case where the deletion is not allowed
        this.toastr.warning('Không thể xóa lớp học này.');
      }
      console.log(err);
    },
  });

  }
}
