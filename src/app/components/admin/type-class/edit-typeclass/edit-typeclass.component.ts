import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaiLopService } from 'src/app/services/loai-lop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-typeclass',
  templateUrl: './edit-typeclass.component.html',
  styleUrls: ['./edit-typeclass.component.css'],
})
export class EditTypeclassComponent implements OnInit {
  editForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<EditTypeclassComponent>,
    private formBuilder: FormBuilder,
    private loaiLopService: LoaiLopService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.formBuilder.group({
      tenLoaiLop: ['', Validators.required],
      hocPhi: ['', Validators.required],
      tomTatDeCuong: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Populate form with existing type class data
    this.editForm.setValue({
      tenLoaiLop: this.data.tenLoaiLop,
      hocPhi: this.data.hocPhi,
      tomTatDeCuong: this.data.tomTatDeCuong
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.editForm.valid && this.selectedFile) {
      const { tenLoaiLop, hocPhi, tomTatDeCuong } = this.editForm.value;

      this.loaiLopService
        .suaLoaiLop(this.data.maLoaiLop, this.selectedFile, tenLoaiLop, hocPhi, tomTatDeCuong)
        .subscribe({
          next: (response) => {
            console.log(response); // Process the response here (maybe update UI or show a message to the user)
            this.dialogRef.close(response);
            this.toastr.success('Cập nhật loại lớp thành công!');
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Có lỗi xảy ra khi cập nhật loại lớp.');
          },
        });
    } else if (!this.selectedFile) {
      this.toastr.error('Vui lòng chọn tài liệu.');
    }
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      this.toastr.warning(
        'Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.'
      );
      this.selectedFile = null;
      return;
    }

    if (
      file.type === 'application/pdf' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      this.selectedFile = file;
    } else {
      this.toastr.warning(
        'Loại tệp không hợp lệ. Vui lòng chọn tệp PDF hoặc DOCX.'
      );
      this.selectedFile = null;
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
