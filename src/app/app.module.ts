import { DetailKyThiCuaToiComponent } from './components/student/ky-thi-cua-toi/detail-ky-thi-cua-toi/detail-ky-thi-cua-toi.component';
import { TypeClassComponent } from './components/admin/type-class/type-class.component';

import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './root.component';
import { httpInterceptorProviders } from './services/http.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { TestComponent } from './components/student/test/test.component';
import {
  Roles,
  SidebarComponent,
} from './components/layouts/sidebar/sidebar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ToastrModule } from 'ngx-toastr';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LecturerHomeComponent } from './components/lecturer/lecturer-home/lecturer-home.component';
import { TestlComponent } from './components/lecturer/testl/testl.component';
import { StudentComponent } from './components/student/student.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { MaterialModule } from './material.module';
import { GuestComponent } from './components/guest/guest.component';
import { GuestFooterComponent } from './components/guest/guest-footer/guest-footer.component';
import { GuestHeaderComponent } from './components/guest/guest-header/guest-header.component';
import { GuestHomeComponent } from './components/guest/guest-home/guest-home.component';
import { GuestResgisterAccountComponent } from './components/guest/guest-resgister-account/guest-resgister-account.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { BreadcrumbsComponent } from './components/admin/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { HomeComponent } from './components/layouts/home/home.component';
import { ListLecturerComponent } from './components/admin/list-lecturer/list-lecturer.component';
import { DetailLecturerComponent } from './components/admin/list-lecturer/detail-lecturer/detail-lecturer.component';
import { DetailStudentComponent } from './components/admin/list-student/detail-student/detail-student.component';
import { ListStudentComponent } from './components/admin/list-student/list-student.component';
import { ListStaffComponent } from './components/admin/list-staff/list-staff.component';
import { DetailStaffComponent } from './components/admin/list-staff/detail-staff/detail-staff.component';
import { NotificationDiglogComponent } from './components/notification/notification-diglog/notification-diglog.component';
import { AddLecturerComponent } from './components/admin/list-lecturer/add-lecturer/add-lecturer.component';
import { Page403Component } from './components/page-error/page403/page403.component';
import { Page404Component } from './components/page-error/page404/page404.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AddStaffComponent } from './components/admin/list-staff/add-staff/add-staff.component';
import { AddStudentComponent } from './components/admin/list-student/add-student/add-student.component';
import { RoleStaffComponent } from './components/admin/list-staff/role-staff/role-staff.component';
import { HosoStudentComponent } from './components/student/hoso-student/hoso-student.component';
import { HosoLecturerComponent } from './components/lecturer/hoso-lecturer/hoso-lecturer.component';
import { StaffComponent } from './components/staff/staff.component';
import { HosoStaffComponent } from './components/staff/hoso-staff/hoso-staff.component';
import { AddTypeclassComponent } from './components/admin/type-class/add-typeclass/add-typeclass.component';
import { EditTypeclassComponent } from './components/admin/type-class/edit-typeclass/edit-typeclass.component';
import { DeleteTypeclassComponent } from './components/admin/type-class/delete-typeclass/delete-typeclass.component';
import { ScheduleComponent } from './components/admin/schedule/schedule.component';
import { AddScheduleComponent } from './components/admin/schedule/add-schedule/add-schedule.component';
import { EditScheduleComponent } from './components/admin/schedule/edit-schedule/edit-schedule.component';
import { DeleteScheduleComponent } from './components/admin/schedule/delete-schedule/delete-schedule.component';
import { CourseComponent } from './components/admin/course/course.component';
import { EditCourseComponent } from './components/admin/course/edit-course/edit-course.component';
import { DeleteCourseComponent } from './components/admin/course/delete-course/delete-course.component';
import { AddCourseComponent } from './components/admin/course/add-course/add-course.component';
import { DetailCourseComponent } from './components/admin/course/detail-course/detail-course.component';
import { RegisterCourseComponent } from './components/student/register-course/register-course.component';
import { QldkComponent } from './components/admin/qldk/qldk.component';
import { DeleteQldkComponent } from './components/admin/qldk/delete-qldk/delete-qldk.component';
import { HuyDangkyComponent } from './components/student/huy-dangky/huy-dangky.component';
import { DetailDangkyComponent } from './components/student/detail-dangky/detail-dangky.component';
import { ClassroomComponent } from './components/admin/classroom/classroom.component';
import { AddClassroomComponent } from './components/admin/classroom/add-classroom/add-classroom.component';
import { EditClassroomComponent } from './components/admin/classroom/edit-classroom/edit-classroom.component';
import { DeleteClassroomComponent } from './components/admin/classroom/delete-classroom/delete-classroom.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { AddRolesComponent } from './components/admin/roles/add-roles/add-roles.component';
import { EditRolesComponent } from './components/admin/roles/edit-roles/edit-roles.component';
import { DeleteRolesComponent } from './components/admin/roles/delete-roles/delete-roles.component';
import { ListNhanvienRolesComponent } from './components/admin/roles/list-nhanvien-roles/list-nhanvien-roles.component';
import { ListHVHPComponent } from './components/admin/qldk/list-hvhp/list-hvhp.component';
import { MyCourseComponent } from './components/student/my-course/my-course.component';
import { EditHosoComponent } from './components/student/hoso-student/edit-hoso/edit-hoso.component';
import { EditHosogvComponent } from './components/lecturer/hoso-lecturer/edit-hosogv/edit-hosogv.component';
import { EditHosostaffComponent } from './components/staff/hoso-staff/edit-hosostaff/edit-hosostaff.component';
import { DocumentComponent } from './components/admin/document/document.component';
import { AddDocumentComponent } from './components/admin/document/add-document/add-document.component';
import { Page0Component } from './components/page-error/page0/page0.component';
import { DeleteComponent } from './components/delete/delete.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { StaffHomeComponent } from './components/staff/staff-home/staff-home.component';
import { PhanCongLopHocComponent } from './components/staff/phan-cong-lop-hoc/phan-cong-lop-hoc.component';
import { ChungChiComponent } from './components/admin/chung-chi/chung-chi.component';
import { AddChungChiComponent } from './components/admin/chung-chi/add-chung-chi/add-chung-chi.component';
import { EditChungChiComponent } from './components/admin/chung-chi/edit-chung-chi/edit-chung-chi.component';
import { DeleteChungChiComponent } from './components/admin/chung-chi/delete-chung-chi/delete-chung-chi.component';
import { BacChungChiComponent } from './components/admin/bac-chung-chi/bac-chung-chi.component';
import { EditBacChungChiComponent } from './components/admin/bac-chung-chi/edit-bac-chung-chi/edit-bac-chung-chi.component';
import { AddBacChungChiComponent } from './components/admin/bac-chung-chi/add-bac-chung-chi/add-bac-chung-chi.component';
import { DeleteBacChungChiComponent } from './components/admin/bac-chung-chi/delete-bac-chung-chi/delete-bac-chung-chi.component';
import { AddClassComponent } from './components/admin/class/add-class/add-class.component';
import { DetailBacChungChiComponent } from './components/admin/bac-chung-chi/detail-bac-chung-chi/detail-bac-chung-chi.component';
import { EditClassComponent } from './components/admin/class/edit-class/edit-class.component';
import { DeleteClassComponent } from './components/admin/class/delete-class/delete-class.component';
import { ClassComponent } from './components/admin/class/class.component';
import { DetailClassComponent } from './components/admin/class/detail-class/detail-class.component';
import { DuyetDkkhComponent } from './components/admin/qldk/duyet-dkkh/duyet-dkkh.component';
import { ListHocVienComponent } from './components/admin/class/list-hoc-vien/list-hoc-vien.component';
import { DetailHocVienComponent } from './components/admin/class/detail-hoc-vien/detail-hoc-vien.component';
import { ListGiaoVienComponent } from './components/admin/class/list-giao-vien/list-giao-vien.component';
import { DetailGiaoVienComponent } from './components/admin/class/detail-giao-vien/detail-giao-vien.component';
import { KyThiComponent } from './components/admin/ky-thi/ky-thi.component';
import { AddKyThiComponent } from './components/admin/ky-thi/add-ky-thi/add-ky-thi.component';
import { DetailKyThiComponent } from './components/admin/ky-thi/detail-ky-thi/detail-ky-thi.component';
import { PhanCongPhongThiComponent } from './components/admin/ky-thi/phan-cong-phong-thi/phan-cong-phong-thi.component';
import { DanhSachPhongThiComponent } from './components/admin/ky-thi/phan-cong-phong-thi/danh-sach-phong-thi/danh-sach-phong-thi.component';
import { DangKyKyThiComponent } from './components/student/dang-ky-ky-thi/dang-ky-ky-thi.component';
import { QuanLyDangKyThiComponent } from './components/admin/quan-ly-dang-ky-thi/quan-ly-dang-ky-thi.component';
import { PhanBoThiComponent } from './components/staff/phan-bo-thi/phan-bo-thi.component';
import { KyThiCuaToiComponent } from './components/student/ky-thi-cua-toi/ky-thi-cua-toi.component';
import { ChonLichThiComponent } from './components/staff/phan-bo-thi/chon-lich-thi/chon-lich-thi.component';
import { ListGiaoVienGacThiComponent } from './components/admin/ky-thi/list-giao-vien-gac-thi/list-giao-vien-gac-thi.component';
import { ChiTietGiaoVienGacThiComponent } from './components/admin/ky-thi/chi-tiet-giao-vien-gac-thi/chi-tiet-giao-vien-gac-thi.component';
import { ChiTietLichThiComponent } from './components/staff/phan-bo-thi/chi-tiet-lich-thi/chi-tiet-lich-thi.component';
import { XacNhanGiaoVienComponent } from './components/admin/ky-thi/xac-nhan-giao-vien/xac-nhan-giao-vien.component';
import { ListGiaoVienLenDiemComponent } from './components/admin/ky-thi/list-giao-vien-len-diem/list-giao-vien-len-diem.component';
import { QuanLyLenDiemComponent } from './components/lecturer/quan-ly-len-diem/quan-ly-len-diem.component';
import { DanhSachHocVienComponent } from './components/lecturer/quan-ly-len-diem/danh-sach-hoc-vien/danh-sach-hoc-vien.component';
import { NhapDiemHocVienComponent } from './components/lecturer/quan-ly-len-diem/nhap-diem-hoc-vien/nhap-diem-hoc-vien.component';
import { ChiTietDiemComponent } from './components/lecturer/quan-ly-len-diem/chi-tiet-diem/chi-tiet-diem.component';
import { ChinhSuaDiemComponent } from './components/lecturer/quan-ly-len-diem/chinh-sua-diem/chinh-sua-diem.component';
import { LichDayComponent } from './components/lecturer/lich-day/lich-day.component';
import { DanhSachTaiLieuComponent } from './components/student/my-course/danh-sach-tai-lieu/danh-sach-tai-lieu.component';
import { QuanLyLopComponent } from './components/lecturer/quan-ly-lop/quan-ly-lop.component';
import { DetailLopComponent } from './components/lecturer/quan-ly-lop/detail-lop/detail-lop.component';
import { DanhSachLichThiComponent } from './components/lecturer/danh-sach-lich-thi/danh-sach-lich-thi.component';
import { DetailClassroomComponent } from './components/admin/classroom/detail-classroom/detail-classroom.component';
import { ListGiaoVienRaDeComponent } from './components/admin/ky-thi/list-giao-vien-ra-de/list-giao-vien-ra-de.component';
import { DetailGiaoVienRaDeComponent } from './components/admin/ky-thi/detail-giao-vien-ra-de/detail-giao-vien-ra-de.component';
import { QuanLiRaDeComponent } from './components/lecturer/quan-li-ra-de/quan-li-ra-de.component';
import { DetailPhongThiComponent } from './components/admin/ky-thi/detail-phong-thi/detail-phong-thi.component';
import { ThongBaoComponent } from './components/thong-bao/thong-bao.component';
import { DetailThongBaoComponent } from './components/thong-bao/detail-thong-bao/detail-thong-bao.component';
import { DsHocVienComponent } from './components/admin/ky-thi/ds-hoc-vien/ds-hoc-vien.component';
import { GuiThongBaoComponent } from './components/lecturer/quan-ly-lop/gui-thong-bao/gui-thong-bao.component';
import { DiemDanhComponent } from './components/admin/diem-danh/diem-danh.component';
import { NhapDiemComponent } from './components/admin/nhap-diem/nhap-diem.component';
import { ListHvLopComponent } from './components/lecturer/quan-ly-lop/list-hv-lop/list-hv-lop.component';
import { DsHvComponent } from './components/lecturer/danh-sach-lich-thi/ds-hv/ds-hv.component';



@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    BreadcrumbsComponent,
    TestComponent,
    SidebarComponent,
    LoginComponent,
    LogoutComponent,
    ChangePasswordComponent,
    LecturerComponent,
    LecturerHomeComponent,
    ListLecturerComponent,
    ListStudentComponent,
    DetailStudentComponent,
    ListStaffComponent,
    DetailStudentComponent,
    TestlComponent,
    DetailStaffComponent,
    StudentComponent,
    DetailLecturerComponent,
    StudentHomeComponent,
    GuestComponent,
    GuestFooterComponent,
    GuestHeaderComponent,
    GuestHomeComponent,
    GuestResgisterAccountComponent,
    NotificationDiglogComponent,
    NotificationDiglogComponent,
    AddLecturerComponent,
    Page403Component,
    Page404Component,
    AddStaffComponent,
    AddStudentComponent,
    RoleStaffComponent,
    HosoStudentComponent,
    HosoLecturerComponent,
    StaffComponent,
    HosoStaffComponent,
    TypeClassComponent,
    AddTypeclassComponent,
    EditTypeclassComponent,
    DeleteTypeclassComponent,
    ScheduleComponent,
    AddScheduleComponent,
    EditScheduleComponent,
    DeleteScheduleComponent,
    CourseComponent,
    EditCourseComponent,
    DeleteCourseComponent,
    AddCourseComponent,
    DetailCourseComponent,
    RegisterCourseComponent,
    QldkComponent,
    DeleteQldkComponent,
    HuyDangkyComponent,
    DetailDangkyComponent,
    AddClassroomComponent,
    EditClassroomComponent,
    DeleteClassroomComponent,
    DetailClassroomComponent,
    RolesComponent,
    AddRolesComponent,
    EditRolesComponent,
    DeleteRolesComponent,
    ListNhanvienRolesComponent,
    ListHVHPComponent,
    MyCourseComponent,
    EditHosoComponent,
    EditHosogvComponent,
    EditHosostaffComponent,
    ClassroomComponent,
    DeleteClassroomComponent,
    DocumentComponent,
    AddDocumentComponent,
    Page0Component,
    DeleteComponent,
    HeaderComponent,
    AdminSidebarComponent,
    StaffHomeComponent,
    PhanCongLopHocComponent,
    ChungChiComponent,
    AddChungChiComponent,
    EditChungChiComponent,
    DeleteChungChiComponent,
    BacChungChiComponent,
    EditBacChungChiComponent,
    AddBacChungChiComponent,
    DeleteBacChungChiComponent,
    DetailBacChungChiComponent,
    ClassComponent,
    AddClassComponent,
    EditClassComponent,
    DeleteClassComponent,
    DetailClassComponent,
    DuyetDkkhComponent,
    ListHocVienComponent,
    DetailHocVienComponent,
    ListGiaoVienComponent,
    DetailGiaoVienComponent,
    KyThiComponent,
    AddKyThiComponent,
    DetailKyThiComponent,
    PhanCongPhongThiComponent,
    DanhSachPhongThiComponent,
    DangKyKyThiComponent,
    KyThiCuaToiComponent,
    QuanLyDangKyThiComponent,
    PhanBoThiComponent,
    ChonLichThiComponent,
    ListGiaoVienGacThiComponent,
    ChiTietGiaoVienGacThiComponent,
    ChiTietLichThiComponent,
    XacNhanGiaoVienComponent,
    ListGiaoVienLenDiemComponent,
    QuanLyLenDiemComponent,
    DanhSachHocVienComponent,
    NhapDiemHocVienComponent,
    ChiTietDiemComponent,
    ChinhSuaDiemComponent,
    LichDayComponent,
    DanhSachTaiLieuComponent,
    QuanLyLopComponent,
    DetailLopComponent,
    DanhSachLichThiComponent,
    ListGiaoVienRaDeComponent,
    DetailGiaoVienRaDeComponent,
    QuanLiRaDeComponent,
    DetailPhongThiComponent,
    DetailKyThiCuaToiComponent,
    ThongBaoComponent,
    DetailThongBaoComponent,
    DsHocVienComponent,
    GuiThongBaoComponent,
    DiemDanhComponent,
    NhapDiemComponent,
    ListHvLopComponent,
    DsHvComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
    }),
  ],
  providers: [httpInterceptorProviders, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
