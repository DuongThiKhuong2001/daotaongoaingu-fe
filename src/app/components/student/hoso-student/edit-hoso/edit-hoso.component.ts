import { TaiKhoan } from './../../../../models/TaiKhoan';
import { StorageService } from './../../../../services/storage.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaiKhoanService } from './../../../../services/tai-khoan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-hoso',
  templateUrl: './edit-hoso.component.html',
  styleUrls: ['./edit-hoso.component.css'],
})
export class EditHosoComponent implements OnInit {
  editForm: FormGroup;
  roles: string = '';
  constructor(
    private dialogRef: MatDialogRef<EditHosoComponent>,
    private formBuilder: FormBuilder,
    private TaiKhoanService: TaiKhoanService,
    private storageService: StorageService,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) {
    console.log(this.data);
    this.editForm = this.formBuilder.group({
      hoTen: ['', Validators.required],
      email: ['', Validators.required],
      soDienThoai: ['', Validators.required],
      diaChi: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      // Các trường riêng cho từng loại tài khoản
      lop: ['', Validators.required], // HocVien
      truongHoc: [''], // HocVien
      soDTNguoiThan: [''], // HocVien
      trinhDo: [''], // GiaoVien
    });
  }

  ngOnInit(): void {
    // Lấy roles từ dữ liệu được truyền vào
    this.roles = this.data.roles;
     this.cdr.detectChanges();

    this.editForm = this.formBuilder.group({
      hoTen: ['', Validators.required],
      email: ['', Validators.required],
      soDienThoai: ['', Validators.required],
      diaChi: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      // Các trường riêng cho từng loại tài khoản
      lop: [''], // HocVien
      truongHoc: [''], // HocVien
      soDTNguoiThan: [''], // HocVien
      trinhDo: [''], // GiaoVien
    });

    // Điền dữ liệu người dùng vào form dựa trên roles
    this.fillFormBasedOnRole(this.roles);
  }

  fillFormBasedOnRole(roles: string): void {
    if (roles === 'GiaoVien') {
      // Điền dữ liệu cho giáo viên
      this.editForm.patchValue({
        hoTen: this.data.dataUser.taiKhoan.hoTen,
        email: this.data.dataUser.taiKhoan.email,
        soDienThoai: this.data.dataUser.taiKhoan.soDienThoai,
        diaChi: this.data.dataUser.taiKhoan.diaChi,
        gioiTinh: this.data.dataUser.taiKhoan.gioiTinh,
        ngaySinh: this.data.dataUser.taiKhoan.ngaySinh,
        trinhDo: this.data.dataUser.trinhDo,
      });
    } else if (roles === 'HocVien') {
      // Điền dữ liệu cho học viên
      this.editForm.patchValue({
        hoTen: this.data.dataUser.taiKhoan.hoTen,
        email: this.data.dataUser.taiKhoan.email,
        soDienThoai: this.data.dataUser.taiKhoan.soDienThoai,
        diaChi: this.data.dataUser.taiKhoan.diaChi,
        gioiTinh: this.data.dataUser.taiKhoan.gioiTinh,
        ngaySinh: this.data.dataUser.taiKhoan.ngaySinh,
        lop: this.data.dataUser.lop,
        truongHoc: this.data.dataUser.truongHoc,
        soDTNguoiThan: this.data.dataUser.soDTNguoiThan,
      });
    } else if (roles === 'NhanVien') {
      this.editForm.patchValue({
        hoTen: this.data.dataUser.taiKhoan.hoTen,
        email: this.data.dataUser.taiKhoan.email,
        soDienThoai: this.data.dataUser.taiKhoan.soDienThoai,
        diaChi: this.data.dataUser.taiKhoan.diaChi,
        gioiTinh: this.data.dataUser.taiKhoan.gioiTinh,
        ngaySinh: this.data.dataUser.taiKhoan.ngaySinh,

      });
    } else {
      // Xử lý trường hợp khác nếu cần
    }
  }
  closePopup() {
    this.dialogRef.close('Closed using function');
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedHoSo: {
        hoTen: any;
        email: any;
        soDienThoai: any;
        diaChi: any;
        gioiTinh: any;
        ngaySinh: any;
        trinhDo?: any; // Thêm "?" để cho phép trường này có hoặc không có
        lop?: any; // Thêm "?" để cho phép trường này có hoặc không có
        truongHoc?: any; // Thêm "?" để cho phép trường này có hoặc không có
        soDTNguoiThan?: any; // Thêm "?" để cho phép trường này có hoặc không có
      } = {
        hoTen: this.editForm.value.hoTen,
        email: this.editForm.value.email,
        soDienThoai: this.editForm.value.soDienThoai,
        diaChi: this.editForm.value.diaChi,
        gioiTinh: this.editForm.value.gioiTinh,
        ngaySinh: this.editForm.value.ngaySinh,
      };

      // Thêm các trường riêng cho từng loại tài khoản nếu cần
      if (this.roles === 'GiaoVien' ) {
        updatedHoSo.trinhDo = this.editForm.value.trinhDo;
      } else if (this.roles === 'HocVien') {
        updatedHoSo.lop = this.editForm.value.lop;
        updatedHoSo.truongHoc = this.editForm.value.truongHoc;
        updatedHoSo.soDTNguoiThan = this.editForm.value.soDTNguoiThan;
      }

      // Gọi service để cập nhật thông tin học viên
      this.TaiKhoanService.updateAccount(
        this.data.dataUser.taiKhoan.tenDangNhap,
        updatedHoSo
      ).subscribe({
        next: (data) => {
          console.log(data);
          this.closePopup();
          this.toastr.success('Chỉnh sửa thành công!');
          this.dialogRef.close('acept');
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.toastr.error('Lỗi khi thực hiện!');
          console.log(err);
          this.cdr.detectChanges();
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
