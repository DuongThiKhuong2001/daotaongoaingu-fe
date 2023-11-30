import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NhanVienService } from 'src/app/services/nhan-vien.service';

@Component({
  selector: 'app-role-staff',
  templateUrl: './role-staff.component.html',
  styleUrls: ['./role-staff.component.css'],
})
export class RoleStaffComponent implements OnInit {
  vaiTros: any[] = [];
  vaiTroNhanViens: any[] = [];
  displayedColumns: string[] = ['tenVaiTro', 'moTa', 'chon']; // Thêm các cột khác nếu cần
  selectedRoles: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      staff: any;
    },
    private nhanVienService: NhanVienService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RoleStaffComponent>
  ) {}

  ngOnInit(): void {
    this.layDanhSachVaiTro();
    this.layDanhSachVaiTroCuaNhanVien();
  }

  layDanhSachVaiTro() {
    this.nhanVienService.layAllVaiTro().subscribe({
      next: (data) => {
        {
          this.vaiTros = data;
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy danh sách vai trò', error);
      },
    });
  }
  layDanhSachVaiTroCuaNhanVien() {
    this.nhanVienService
      .layVaiTroCuaNhanVien(this.data.staff.taiKhoan.tenDangNhap)
      .subscribe({
        next: (data) => {
          this.vaiTroNhanViens = data;

          // Kiểm tra và thiết lập các ô chọn dựa trên danh sách vai trò của nhân viên
          this.vaiTroNhanViens.forEach((vaiTro) => {
            if (this.isSelectedRole(vaiTro.maVaiTro)) {
              this.toggleRoleSelection(vaiTro.maVaiTro);
            }
          });
        },
        error: (error) => {
          console.error('Lỗi khi lấy danh sách vai trò của nhân viên', error);
        },
      });
  }

  // Kiểm tra xem vai trò có trong cả hai danh sách hay không
  isSelectedRole(roleId: number): boolean {
    return (
      this.vaiTros.some((role) => role.maVaiTro === roleId) &&
      this.vaiTroNhanViens.some((role) => role.maVaiTro === roleId)
    );
  }

  closePopup() {
    this.dialogRef.close('Closed using function');
  }
  toggleRoleSelection(roleId: number) {
    // Kiểm tra xem roleId đã tồn tại trong mảng selectedRoles chưa
    const index = this.selectedRoles.indexOf(roleId);

    if (index === -1) {
      // Nếu không tồn tại, thêm roleId vào mảng
      this.selectedRoles.push(roleId);
    } else {
      // Nếu đã tồn tại, loại bỏ roleId khỏi mảng
      this.selectedRoles.splice(index, 1);
    }
  }
  saveSelectedRoles() {
    const body = {
      vaiTroIds: this.selectedRoles,
    };
    this.nhanVienService
      .themVaiTroChoNhanVien(this.data.staff.maNhanVien, body)
      .subscribe({
        next: (data) => {
          this.toastr.success(data.message, 'Thành công');
          this.dialogRef.close();
        },
        error: (err) => {
          this.toastr.error('Cảnh báo lỗi!');
        },
      });
  }
}
