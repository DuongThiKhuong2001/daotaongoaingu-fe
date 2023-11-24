import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HinhThucHoc } from 'src/app/models/LopHoc';
import { KhoaHocService } from 'src/app/services/khoa-hoc.service';
import { LichHocService } from 'src/app/services/lich-hoc.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { PhongHocService } from 'src/app/services/phong-hoc.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent implements OnInit {
  ListKhoaHoc: any[] = [];
  ListPhongHoc: any[] = [];
  ListLichHoc: any[] = [];
  hinhThucHocs: HinhThucHoc[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { maKhoaHoc: number },
    private dialogRef: MatDialogRef<AddClassComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private lopHocService: LopHocService,
    private khoaHocService: KhoaHocService,
    private phonghocService: PhongHocService,
    private lichHocService: LichHocService
  ) {
    this.hinhThucHocs = Object.values(HinhThucHoc);
  }

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    tenLop: ['', [Validators.required]],
    soLuong: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    hinhThucHoc: ['', Validators.required],
  });

  savetypeclass() {
    if (this.myform.valid) {
      const body = {
        tenLop: this.formControls.tenLop.value,
        soLuong: this.formControls.soLuong.value,
        maKhoaHoc: this.data.maKhoaHoc,
        hinhThucHoc: this.formControls.hinhThucHoc.value,
      };

      this.lopHocService.themLopHoc(body).subscribe({
        next: (data) => {
          console.log(data);

          if (data && data.message === 'name-exist') {
            // Xử lý trường hợp tên lớp học đã tồn tại
            this.toastr.warning('Tên lớp học đã tồn tại!');
          } else {
            // Xử lý trường hợp thêm lớp học thành công
            this.closePopup();
            this.toastr.success('Thêm lớp học thành công!');
          }
        },
        error: (err) => {
          this.toastr.error(err);
        },
      });
    }
  }
}
