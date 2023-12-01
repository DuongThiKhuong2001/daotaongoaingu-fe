import { LoaiLopService } from './../../../../services/loai-lop.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-typeclass',
  templateUrl: './add-typeclass.component.html',
  styleUrls: ['./add-typeclass.component.css'],
})
export class AddTypeclassComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<AddTypeclassComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaiLopService: LoaiLopService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {}

  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    tenLoaiLop: ['', [Validators.required]],
    hocPhi: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    tomTatDeCuong: ['', [Validators.required]]
  });

  savetypeclass() {
  if (this.myform.valid && this.selectedFile) {
    const tenLoaiLop = this.myform.value.tenLoaiLop || ''; // Nếu undefined hoặc null thì gán là chuỗi rỗng
    const hocPhi = Number(this.myform.value.hocPhi) || 0; // Nếu undefined hoặc null thì gán là 0
    const tomTatDeCuong = this.myform.value.tenLoaiLop || '';
    this.loaiLopService
      .addLoaiLop(this.selectedFile, tenLoaiLop, hocPhi, tomTatDeCuong)
      .subscribe({
        next: (data) => {
          this.closePopup();
          this.toastr.success('Thêm loại lớp thành công!');
        },
        error: (err) => {
          if (err.error.message === 'Tên loại lớp đã tồn tại') {
            this.toastr.error(
              'Tên loại lớp đã tồn tại. Vui lòng chọn một tên khác.'
            );
          } else {
            this.toastr.error('Có lỗi xảy ra khi thêm loại lớp.');
          }
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
        'Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 2MB!'
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
}
