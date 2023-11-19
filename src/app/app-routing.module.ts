import { ListLecturerComponent } from './components/admin/list-lecturer/list-lecturer.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { StudentComponent } from './components/student/student.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { TestComponent } from './components/student/test/test.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LecturerHomeComponent } from './components/lecturer/lecturer-home/lecturer-home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GuestComponent } from './components/guest/guest.component';
import { GuestHomeComponent } from './components/guest/guest-home/guest-home.component';
import { GuestResgisterAccountComponent } from './components/guest/guest-resgister-account/guest-resgister-account.component';
import { ListStudentComponent } from './components/admin/list-student/list-student.component';
import { ListStaffComponent } from './components/admin/list-staff/list-staff.component';
import { Page403Component } from './components/page-error/page403/page403.component';
import { Page404Component } from './components/page-error/page404/page404.component';
import { DetailStaffComponent } from './components/admin/list-staff/detail-staff/detail-staff.component';
import { HosoStudentComponent } from './components/student/hoso-student/hoso-student.component';
import { HosoLecturerComponent } from './components/lecturer/hoso-lecturer/hoso-lecturer.component';
import { TypeClassComponent } from './components/admin/type-class/type-class.component';
import { ScheduleComponent } from './components/admin/schedule/schedule.component';
import { CourseComponent } from './components/admin/course/course.component';
import { RegisterCourseComponent } from './components/student/register-course/register-course.component';
import { QldkComponent } from './components/admin/qldk/qldk.component';
import { ClassroomComponent } from './components/admin/classroom/classroom.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { MyCourseComponent } from './components/student/my-course/my-course.component';
import { DocumentComponent } from './components/admin/document/document.component';
import { Page0Component } from './components/page-error/page0/page0.component';
import { StaffComponent } from './components/staff/staff.component';
import { StaffHomeComponent } from './components/staff/staff-home/staff-home.component';
import { PhanCongLopHocComponent } from './components/staff/phan-cong-lop-hoc/phan-cong-lop-hoc.component';
import { ChungChiComponent } from './components/admin/chung-chi/chung-chi.component';
import { BacChungChiComponent } from './components/admin/bac-chung-chi/bac-chung-chi.component';
import { ClassComponent } from './components/admin/class/class.component';
import { ListHocVienComponent } from './components/admin/class/list-hoc-vien/list-hoc-vien.component';
import { ListGiaoVienComponent } from './components/admin/class/list-giao-vien/list-giao-vien.component';
import { KyThiComponent } from './components/admin/ky-thi/ky-thi.component';
import { PhanCongPhongThiComponent } from './components/admin/ky-thi/phan-cong-phong-thi/phan-cong-phong-thi.component';
import { DangKyKyThiComponent } from './components/student/dang-ky-ky-thi/dang-ky-ky-thi.component';
import { QuanLyDangKyThiComponent } from './components/admin/quan-ly-dang-ky-thi/quan-ly-dang-ky-thi.component';
import { PhanBoThiComponent } from './components/staff/phan-bo-thi/phan-bo-thi.component';
import { KyThiCuaToiComponent } from './components/student/ky-thi-cua-toi/ky-thi-cua-toi.component';
import { ChonLichThiComponent } from './components/staff/phan-bo-thi/chon-lich-thi/chon-lich-thi.component';
import { ListGiaoVienGacThiComponent } from './components/admin/ky-thi/list-giao-vien-gac-thi/list-giao-vien-gac-thi.component';
import { ListGiaoVienLenDiemComponent } from './components/admin/ky-thi/list-giao-vien-len-diem/list-giao-vien-len-diem.component';
import { QuanLyLenDiemComponent } from './components/lecturer/quan-ly-len-diem/quan-ly-len-diem.component';
import { DanhSachHocVienComponent } from './components/lecturer/quan-ly-len-diem/danh-sach-hoc-vien/danh-sach-hoc-vien.component';
import { LichDayComponent } from './components/lecturer/lich-day/lich-day.component';
import { DanhSachTaiLieuComponent } from './components/student/my-course/danh-sach-tai-lieu/danh-sach-tai-lieu.component';
import { QuanLyLopComponent } from './components/lecturer/quan-ly-lop/quan-ly-lop.component';
import { DanhSachLichThiComponent } from './components/lecturer/danh-sach-lich-thi/danh-sach-lich-thi.component';
import { HosoStaffComponent } from './components/staff/hoso-staff/hoso-staff.component';
import { ListGiaoVienRaDeComponent } from './components/admin/ky-thi/list-giao-vien-ra-de/list-giao-vien-ra-de.component';
import { QuanLiRaDeComponent } from './components/lecturer/quan-li-ra-de/quan-li-ra-de.component';
import { ThongBaoComponent } from './components/thong-bao/thong-bao.component';
import { DsHocVienComponent } from './components/admin/ky-thi/ds-hoc-vien/ds-hoc-vien.component';
import { ListHvLopComponent } from './components/lecturer/quan-ly-lop/list-hv-lop/list-hv-lop.component';
import { DsHvComponent } from './components/lecturer/danh-sach-lich-thi/ds-hv/ds-hv.component';


const routes: Routes = [
  {
    path: '',
    component: RootComponent,
  },
  {
    path: 'quan-tri-vien',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        data: { titulo: 'Trang chủ' },
      },
      {
        path: 'trang-chu',
        component: AdminHomeComponent,
        data: {
          titulo: 'Trang chủ',
          breadcrumbs: [{ label: 'Trang chủ', url: '/' }],
        },
      },

      {
        path: 'danh-sach-giao-vien',
        component: ListLecturerComponent,
        data: {
          titulo: 'Giáo viên',
          breadcrumbs: [{ label: 'Lấy danh sách giáo viên', url: '/' }],
        },
      },
      {
        path: 'danh-sach-hoc-vien',
        component: ListStudentComponent,
        data: {
          titulo: 'Học viên',
          breadcrumbs: [{ label: 'Lấy danh sách học viên', url: '/' }],
        },
      },
      {
        path: 'danh-sach-nhan-vien',
        component: ListStaffComponent,
        data: {
          titulo: 'Nhân viên',
          breadcrumbs: [{ label: 'Lấy danh sách nhân viên', url: '/' }],
        },
      },

      {
        path: 'loai-lop',
        component: TypeClassComponent,
        data: {
          titulo: 'Quản lý loại lớp',
          breadcrumbs: [{ label: 'Loại lớp', url: '/' }],
        },
      },
      {
        path: 'lich-hoc',
        component: ScheduleComponent,
        data: {
          titulo: 'Quản lý lịch học',
          breadcrumbs: [{ label: 'Lịch học', url: '/' }],
        },
      },
      {
        path: 'quan-ly-phong-hoc',
        component: ClassroomComponent,
        data: {
          titulo: 'Quản lý phòng học',
          breadcrumbs: [{ label: 'Phòng học', url: '/' }],
        },
      },

      {
        path: 'danh-sach-vai-tro',
        component: RolesComponent,
        data: {
          titulo: 'Quản lý vai trò',
          breadcrumbs: [{ label: 'Vai trò', url: '/' }],
        },
      },

      {
        path: 'quan-ly-chung-chi',
        component: ChungChiComponent,
        data: {
          titulo: 'Quản lý chứng chỉ',
          breadcrumbs: [{ label: 'Chứng chỉ', url: '/' }],
        },
      },
      {
        path: 'quan-ly-bac-chung-chi',
        component: BacChungChiComponent,
        data: {
          titulo: 'Quản lý bậc chứng chỉ',
          breadcrumbs: [{ label: 'Bậc chứng chỉ', url: '/' }],
        },
      },
    ],
  },

  //hoc vien
  {
    path: 'hoc-vien',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: HosoStudentComponent,
        data: { titulo: 'Hồ sơ' },
      },
      // {
      //   path: 'trang-chu',
      //   component: StudentHomeComponent,
      //   data: {
      //     titulo: 'Trang chủ',
      //     breadcrumbs: [{ label: 'Trang chủ', url: '/' }],
      //   },
      // },
      {
        path: 'thong-bao',
        component: ThongBaoComponent,
        data: {
          titulo: 'Thông báo',
          breadcrumbs: [{ label: 'Thông báo ', url: '/' }],
        },
      },

      {
        path: 'dang-ky-khoa-hoc',
        component: RegisterCourseComponent,
        data: {
          titulo: 'Khóa học',
          breadcrumbs: [{ label: 'Các khóa học', url: '/' }],
        },
      },
      {
        path: 'khoa-hoc-cua-toi',
        component: MyCourseComponent,
        data: {
          titulo: 'Khóa học của tôi',
          breadcrumbs: [{ label: 'Các khóa học', url: '/' }],
        },
      },
      {
        path: 'khoa-hoc-cua-toi/tai-tai-lieu/:maLoaiLop',
        component: DanhSachTaiLieuComponent,
        data: {
          titulo: 'Danh sách tài liệu',
          breadcrumbs: [{ label: 'Danh sách tài liệu', url: '/' }],
        },
      },
      {
        path: 'ho-so',
        component: HosoStudentComponent,
        data: {
          titulo: 'Hồ sơ',
          breadcrumbs: [{ label: 'Hồ sơ cá nhân', url: '/' }],
        },
      },
      {
        path: 'danh-sach-ky-thi',
        component: DangKyKyThiComponent,
        data: {
          titulo: 'Danh sách kì thi',
          breadcrumbs: [{ label: 'Kỳ thi', url: '/' }],
        },
      },
      {
        path: 'ky-thi-cua-toi',
        component: KyThiCuaToiComponent,
        data: {
          titulo: 'Kỳ thi đã đăng ký',
          breadcrumbs: [{ label: 'Kỳ thi', url: '/' }],
        },
      },
    ],
  },
  //giao vien
  {
    path: 'giao-vien',
    component: LecturerComponent,
    children: [
      {
        path: '',
        component: HosoLecturerComponent,
        data: { titulo: 'Hồ sơ' },
      },

      // {
      //   path: 'trang-chu',
      //   component: LecturerHomeComponent,
      //   data: {
      //     titulo: 'Trang chủ',
      //     breadcrumbs: [{ label: 'Trang chủ', url: '/' }],
      //   },
      // },
      {
        path: 'ho-so',
        component: HosoLecturerComponent,
        data: {
          titulo: 'Hồ sơ',
          breadcrumbs: [{ label: 'Hồ sơ cá nhân', url: '/' }],
        },
      },
      {
        path: 'quan-ly-lop-hoc',
        component: QuanLyLopComponent,
        data: {
          titulo: 'Quản lý lớp học',
          breadcrumbs: [{ label: 'Quản lý lớp học ', url: '/' }],
        },
      },
      {
        path: 'thong-bao',
        component: ThongBaoComponent,
        data: {
          titulo: 'Thông báo',
          breadcrumbs: [{ label: 'Thông báo ', url: '/' }],
        },
      },

      {
        path: 'quan-ly-lop-hoc/:maKhoaHoc/danh-sach-lop-hoc/:maLopHoc/danh-sach-hoc-vien',
        component: ListHvLopComponent,
        data: {
          titulo: 'Quản lý lớp học',
          breadcrumbs: [{ label: 'Quản lý lớp học ', url: '/' }],
        },
      },
      {
        path: 'danh-sach-lich-gac-thi',
        component: DanhSachLichThiComponent,
        data: {
          titulo: 'Danh sách lịch gác thi',
          breadcrumbs: [{ label: 'Quản lý lớp học ', url: '/' }],
        },
      },

      {
        path: 'danh-sach-lich-gac-thi/:maKyThi/danh-sach-lich-gac-thi/:maLichThi/danh-sach-hoc-vien/:trangThai',
        component: DsHvComponent,
        data: {
          titulo: 'Danh sách học viên',
          breadcrumbs: [{ label: 'Danh sách học viên ', url: '/' }],
        },
      },
      {
        path: 'quan-ly-len-diem',
        component: QuanLyLenDiemComponent,
        data: {
          titulo: 'Nhập điểm',
          breadcrumbs: [{ label: 'Quản lý lên điểm', url: '/' }],
        },
      },
      {
        path: 'quan-ly-ra-de',
        component: QuanLiRaDeComponent,
        data: {
          titulo: 'Danh sách kỳ thi ra đề ',
          breadcrumbs: [{ label: 'Quản lý ra đề', url: '/' }],
        },
      },
      {
        path: 'quan-ly-len-diem/ky-thi/:maKyThi/lich-thi/:maLichThi',
        component: DanhSachHocVienComponent,
        data: {
          titulo: 'Danh sách học viên cần lên điểm',
          breadcrumbs: [{ label: 'Danh sách học viên cần lên điểm', url: '/' }],
        },
      },
    ],
  },

  //nhanvien
  {
    path: 'nhan-vien',
    component: StaffComponent,
    children: [
      {
        path: '',
        component: HosoStaffComponent,
        data: { titulo: 'Hồ sơ' },
      },

      // {
      //   path: 'trang-chu',
      //   component: StaffHomeComponent,
      //   data: {
      //     titulo: 'Trang chủ',
      //     breadcrumbs: [{ label: 'Trang chủ', url: '/' }],
      //   },
      // },
      {
        path: 'ho-so',
        component: HosoStaffComponent,
        data: {
          titulo: 'Hồ sơ',
          breadcrumbs: [{ label: 'Hồ sơ cá nhân', url: '/' }],
        },
      },
      {
        path: 'khoa-hoc',
        component: CourseComponent,
        data: {
          titulo: 'Khóa học',
          breadcrumbs: [{ label: 'Khóa học', url: '/' }],
        },
      },
      {
        path: 'quan-ly-dang-ky-khoa-hoc',
        component: QldkComponent,
        data: {
          titulo: 'QL Đăng ký Khóa học',
          breadcrumbs: [{ label: 'Khóa học', url: '/' }],
        },
      },

      {
        path: 'quan-ly-khoa-hoc/:maKhoaHoc/danh-sach-lop-hoc',
        component: ClassComponent,
        data: {
          titulo: 'Quản lí lớp học',
          breadcrumbs: [{ label: 'Lớp học', url: '/' }],
        },
      },
      {
        path: 'quan-ly-khoa-hoc/:maKhoaHoc/danh-sach-lop-hoc/:maLopHoc/danh-sach-hoc-vien',
        component: ListHocVienComponent,
        data: {
          titulo: 'Danh sách học viên của lớp học',
          breadcrumbs: [{ label: 'Danh sách học viên', url: '/' }],
        },
      },
      {
        path: 'quan-ly-khoa-hoc/:maKhoaHoc/danh-sach-lop-hoc/:maLopHoc/danh-sach-giao-vien-hop-le',
        component: ListGiaoVienComponent,
        data: {
          titulo: 'Danh sách giáo viên hợp lệ',
          breadcrumbs: [{ label: 'Danh sách giáo viên', url: '/' }],
        },
      },

      {
        path: 'phan-cong-lop-hoc',
        component: PhanCongLopHocComponent,
        data: {
          titulo: 'Phân công lớp học',
          breadcrumbs: [{ label: 'Phân công lớp học', url: '/' }],
        },
      },
      {
        path: 'phan-bo-thi',
        component: PhanBoThiComponent,
        data: {
          titulo: 'Phân bổ thi',
          breadcrumbs: [{ label: 'Phân bổ thi', url: '/' }],
        },
      },
      {
        path: 'phan-bo-thi/:maDangKyThi/chon-lich-thi/:maKyThi/:trangThai',
        component: ChonLichThiComponent,
        data: {
          titulo: 'Chọn lịch thi',
          breadcrumbs: [{ label: 'Chọn lịch thi', url: '/' }],
        },
      },
      {
        path: 'quan-ly-tai-lieu',
        component: DocumentComponent,
        data: {
          titulo: 'Quản lí tài liệu',
          breadcrumbs: [{ label: 'Tài liệu', url: '/' }],
        },
      },
      {
        path: 'quan-ly-ky-thi',
        component: KyThiComponent,
        data: {
          titulo: 'Quản lí kỳ thi',
          breadcrumbs: [{ label: 'Kỳ thi', url: '/' }],
        },
      },
      {
        path: 'quan-ly-dang-ky-thi',
        component: QuanLyDangKyThiComponent,
        data: {
          titulo: 'Quản lí đăng ký thi',
          breadcrumbs: [{ label: 'Quản lý đăng ký thi', url: '/' }],
        },
      },
      {
        path: 'quan-ly-ky-thi/:maKyThi/danh-sach-lich-thi',
        component: PhanCongPhongThiComponent,
        data: {
          titulo: 'Quản lý lịch thi',
          breadcrumbs: [{ label: 'Danh sách lịch thi', url: '/' }],
        },
      },
      {
        path: 'quan-ly-ky-thi/:maKyThi/lich-thi/:maLichThi/phan-cong-gac-thi/:trangThai',
        component: ListGiaoVienGacThiComponent,
        data: {
          titulo: 'Chọn giáo viên gác thi',
          breadcrumbs: [{ label: 'Chọn giáo viên', url: '/' }],
        },
      },
      {
        path: 'quan-ly-ky-thi/:maKyThi/lich-thi/:maLichThi/phan-cong-len-diem/:trangThai',
        component: ListGiaoVienLenDiemComponent,
        data: {
          titulo: 'Chọn giáo viên lên điểm',
          breadcrumbs: [{ label: 'Chọn giáo viên', url: '/' }],
        },
      },

      // {
      //   path: 'quan-ly-ky-thi/:maKyThi/danh-sach-giao-vien-ra-de',
      //   component: ListGiaoVienRaDeComponent,
      //   data: {
      //     titulo: 'Danh sách giáo viên ra đề',
      //     breadcrumbs: [{ label: 'Danh sách giáo viên ra đề', url: '/' }],
      //   },
      // },
      {
        path: 'quan-ly-ky-thi/:maKyThi/danh-sach-giao-vien-ra-de/phan-cong-ra-de/:trangThai',
        component: ListGiaoVienRaDeComponent,
        data: {
          titulo: 'Chọn giáo viên ra đề',
          breadcrumbs: [{ label: 'Chọn giáo viên', url: '/' }],
        },
      },
      {
        path: 'quan-ly-ky-thi/:maKyThi/lich-thi/:maLichThi/danh-sach-hoc-vien/:trangThai',
        component: DsHocVienComponent,
        data: {
          titulo: 'Danh sách học viên',
          breadcrumbs: [{ label: 'Chọn giáo viên', url: '/' }],
        },
      },
    ],
  },
  {
    path: 'trang-chu',
    component: GuestComponent,
    children: [
      { path: '', component: GuestHomeComponent },
      { path: 'dang-ky', component: GuestResgisterAccountComponent },
    ],
  },

 

  {
    path: 'dang-nhap',
    component: LoginComponent,
  },
  { path: '403', component: Page403Component },
  { path: 'bao-tri', component: Page0Component },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
