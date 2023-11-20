import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DangKyThiService } from './../../../../services/dang-ky-thi.service';
import { KetQuaThiService } from './../../../../services/ket-qua-thi.service';

@Component({
  selector: 'app-chinh-sua-diem',
  templateUrl: './chinh-sua-diem.component.html',
  styleUrls: ['./chinh-sua-diem.component.css'],
})
export class ChinhSuaDiemComponent implements OnInit {
  maDangKyThi: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<ChinhSuaDiemComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dangKyThiService: DangKyThiService,
    private ketQuaThiService: KetQuaThiService
  ) {}
  get formControls() {
    return this.myform.controls;
  }
  myform = this.formBuilder.group({
    diemNghe: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    diemNoi: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    diemDoc: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    diemViet: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
  });

  ngOnInit(): void {
    // Gán giá trị từ this.data.item vào các trường của form
    this.myform.setValue({
      diemNghe: this.data.item.diemNghe,
      diemNoi: this.data.item.diemNoi,
      diemDoc: this.data.item.diemDoc,
      diemViet: this.data.item.diemViet,
    });
  }

  savetypeclass() {
    if (this.myform.valid) {
      const formData = {
        ...this.myform.value,
        maDangKyThi: this.maDangKyThi,
      };
      this.ketQuaThiService
        .suaKetQuaThi(this.data.item.maKetQuaThi, formData)
        .subscribe({
          next: (data) => {
            this.closePopup();
            this.toastr.success('Cập nhật điểm thành công!');
          },
          error: (err) => {
           this.toastr.error('Có lỗi xảy ra!');
          },
        });
    }
  }

  closePopup() {
    this.dialogRef.close('Closed using function');
  }
}



