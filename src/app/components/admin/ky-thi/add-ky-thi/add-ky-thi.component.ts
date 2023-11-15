import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { KyThiService } from 'src/app/services/ky-thi.service';
import { ChungChiService } from 'src/app/services/chung-chi.service'; // Đảm bảo rằng bạn đã tạo service này
import { KyThi } from 'src/app/models/KyThi';
import { LichThiService } from './../../../../services/lich-thi.service';
import { LichThi } from 'src/app/models/LichThi';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-ky-thi',
  templateUrl: './add-ky-thi.component.html',
  styleUrls: ['./add-ky-thi.component.css'],
})
export class AddKyThiComponent implements OnInit {
  availableChungChi: any[] = [];
  availableNgayThi: Date[] = [];
  years: number[] = [];
  months: number[] = [];
  currentKyThi: any | null = null;
  isEdit = false;
  lichThis: LichThi[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddKyThiComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private kyThiService: KyThiService,
    private chungChiService: ChungChiService,
    private lichThiService: LichThiService
  ) {
    if (data && data.currentKyThi) {
      this.currentKyThi = data.currentKyThi;
    }
  }

  get formControls() {
    return this.myform.controls;
  }
  onThangNamThiChanged() {
    const thang = this.myform.get('thangThi')?.value;
    const nam = this.myform.get('namThi')?.value;
    if (thang && nam) {
      this.loadNgayThi(thang, nam);
    }
  }

  loadNgayThi(thang: string, nam: string) {
    this.kyThiService.getDaysOfMonth(nam, thang).subscribe((data) => {
      this.availableNgayThi = data;
    });
  }

  loadLichThiCuaKyThi() {
    this.lichThiService
      .layLichThiKyThi(this.currentKyThi.maKyThi)
      .pipe(
        tap((lichThis) => {
          this.lichThis = lichThis;
          const selectedNgayThi = this.lichThis.map(
            (lichThi) => new Date(lichThi.ngayThi)
          );
          this.myform.patchValue({
            thangThi: this.currentKyThi.thangThi,
            namThi: this.currentKyThi.namThi,
            soLuongDuocDangKy: this.currentKyThi.soLuongDuocDangKy,
            maChungChi: this.currentKyThi.chungChi.maChungChi,

          });
        }),
        switchMap(() =>
          this.kyThiService.getDaysOfMonth(
            this.currentKyThi.namThi,
            this.currentKyThi.thangThi
          )
        )
      )
      .subscribe((data) => {
        this.availableNgayThi = data;
      });
  }

  ngOnInit(): void {
    if (this.currentKyThi) {
      this.isEdit = true;
      this.loadLichThiCuaKyThi();
    }
    this.loadChungChi();
    for (
      let year = new Date().getFullYear();
      year <= new Date().getFullYear() + 1;
      year++
    ) {
      this.years.push(year);
    }

    for (let month = 1; month <= 12; month++) {
      this.months.push(month);
    }
    // Thêm lắng nghe sự kiện thay đổi
    this.myform
      .get('thangThi')
      ?.valueChanges.subscribe(() => this.onThangNamThiChanged());
    this.myform
      .get('namThi')
      ?.valueChanges.subscribe(() => this.onThangNamThiChanged());
  }

  loadChungChi() {
    this.chungChiService.layTatCaChungChi().subscribe((data) => {
      this.availableChungChi = data;
    });
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }

  myform = this.formBuilder.group({
    thangThi: [
      '',
      [Validators.required, Validators.min(1), Validators.max(12)],
    ],
    namThi: ['', [Validators.required, Validators.min(1)]],
    soLuongDuocDangKy: ['', [Validators.required, Validators.min(1)]],
    maChungChi: ['', [Validators.required]],
    danhSachNgayThi: ['',[Validators.required]],
  });

  saveKyThi() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      if (this.isEdit) {
        this.kyThiService
          .suaKyThi(this.currentKyThi?.maKyThi, formData)
          .subscribe({
            next: (data) => {
              if (data.message && data.message === 'exist') {
                this.toastr.warning('Kỳ thi đã tồn tại trong tháng này!');
              } else {
                this.toastr.success('Chỉnh sửa kỳ thi thành công!');
                this.dialogRef.close('edited');
              }
            },
            error: (err) => {
              if (err.status === 400) {
                // Handle the case where the deletion is not allowed
                this.toastr.warning('Không thể chỉnh sửa kỳ thi này. ');
              }
              console.log(err);
            },
          });
      } else {
        // Trong chế độ thêm mới, gọi phương thức thêm kỳ thi
        this.kyThiService.themKyThi(formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Kỳ thi đã tồn tại trong tháng này!');
            } else {
              this.toastr.success('Thêm kỳ thi thành công!');
              this.dialogRef.close('success');
            }
          },
          error: (err) => {
            this.toastr.error(err);
          },
        });
      }
    }
  }
}
