import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaiLieuService } from 'src/app/services/tai-lieu.service';
import { LoaiLopService } from './../../../../services/loai-lop.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
})
export class AddDocumentComponent implements OnInit {
  selectedFile: File | null = null;
  ListLoaiLop: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddDocumentComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private taiLieuService: TaiLieuService,
    private loaiLopService: LoaiLopService
  ) {}

  ngOnInit(): void {
    this.loadLoaiLop();
  }

  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    maLoaiLop: ['', [Validators.required]],
  });

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const maxFileSize = 2 * 1024 * 1024; // 5 MB in bytes

    if (file.size > maxFileSize) {
      this.toastr.warning('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 2MB.');
      this.selectedFile = null;
      return;
    }

    if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      this.selectedFile = file;
    } else {
      this.toastr.warning('Loại tệp không hợp lệ. Vui lòng chọn tệp PDF hoặc DOCX.');
      this.selectedFile = null;
    }
  }


  loadLoaiLop() {
    this.loaiLopService.layTatCaLoaiLop().subscribe((data) => {
      this.ListLoaiLop = data;
    });
  }

  saveDocument() {
    if (this.myform.valid && this.selectedFile) {
      const maLoaiLop = this.myform.get('maLoaiLop')?.value;
      this.taiLieuService.createTaiLieu(this.selectedFile, maLoaiLop).subscribe(event => {
        this.dialogRef.close('ok');
      });
    } else {
       this.dialogRef.close();
    }

  }
}
