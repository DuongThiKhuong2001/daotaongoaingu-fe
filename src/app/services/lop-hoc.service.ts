import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestComponent } from './../components/student/test/test.component';

@Injectable({
  providedIn: 'root',
})
export class LopHocService {
  private apiBaseUrl = '/api'; // Địa chỉ cơ sở API của bạn

  constructor(private http: HttpClient) {}

  // Lấy danh sách học viên của một lớp học
  getHocViensByLopHoc(maLop: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/lop-hoc/${maLop}/hoc-vien`);
  }

  // Thêm học viên vào lớp học
  addHocVienToLopHoc(lopHocRequest: any): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/lop-hoc/them-hoc-vien-vao-lop`,
      lopHocRequest
    );
  }

  // Cập nhật phòng học cho lớp học
  capNhatPhongHoc(maLop: number, body: any): Observable<any> {
    return this.http.put(
      `${this.apiBaseUrl}/lop-hoc/${maLop}/cap-nhat-phong-hoc-lich-hoc`,
      body
    );
  }

  // Chuyển học viên từ một lớp học sang lớp học khác
  chuyenHocVien(maLop: number, lopHocRequest: any): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/lop-hoc/${maLop}/chuyen-hoc-vien`,
      lopHocRequest
    );
  }

  // Thêm lớp học mới
  themLopHoc(lopHocRequest: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/lop-hoc/them`, lopHocRequest);
  }

  // Lấy danh sách lớp học
  layDanhSachLopHoc(
    page: number,
    size: number,
    sortBy: string,
    sortDir: string,
    searchTerm: string
  ): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/lop-hoc/lay-danh-sach`, {
      params: {
        page: page.toString(),
        size: size.toString(),
        sortBy,
        sortDir,
        searchTerm,
      },
    });
  }

  // Lấy thông tin lớp học dựa trên mã lớp
  layLopHoc(maLopHoc: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/lop-hoc/lay/${maLopHoc}`);
  }

  // Lấy danh sách lớp học của một khóa học
  layDanhSachLopCuaKhoaHoc(maKhoaHoc: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/lop-hoc/khoa-hoc/${maKhoaHoc}`);
  }

  // Xóa lớp học dựa trên mã lớp
  xoaLopHoc(maLopHoc: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/lop-hoc/xoa/${maLopHoc}`);
  }

  // Lấy danh sách lịch học có phòng trống cho một lớp học
  getAvailableLichHoc(maLop: number): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/lop-hoc/${maLop}/lich-hoc-phong-trong`
    );
  }
  getAvailablePhongHoc(maLop: number, maLichHoc: number): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/lop-hoc/${maLop}/lich-hoc/${maLichHoc}/phong-trong`
    );
  }
  // Lấy danh sách lớp học của một khóa học
  // layDanhSachLopCuaKhoaHocDaSap(maKhoaHoc: number): Observable<any> {
  //   return this.http.get(
  //     `${this.apiBaseUrl}/lop-hoc/khoa-hoc/${maKhoaHoc}/lop-hoc-da-sap-lich`
  //   );
  // }
  datGiaoVienDay(maLop: number, maGiaoVien: number): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/lop-hoc/${maLop}/them-giao-vien/${maGiaoVien}`,
      null
    );
  }
  getAvailableGiaoVien(maLop: number): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/lop-hoc/${maLop}/danh-sach-giao-vien-hop-le`
    );
  }
  laySLLHDGD(tenGiaoVien: string): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/lop-hoc/so-luong-lop-day-hien-tai-cua-giao-vien/${tenGiaoVien}`,
      { responseType: 'text' }
    );
  }
  layLopHocHVDTGTMKH(tenDangNhap: string, khoaHocId: number): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/lop-hoc/tim-lop-hoc/${tenDangNhap}/${khoaHocId}`
    );
  }
  //lịch dạy của một giáo viên
  lichDayCuaGiaoVien(tenDangNhap: string): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/lay-lich-hoc-cua-mot-giao-vien/${tenDangNhap}`
    );
  }
  lopHocCuaGiaoVien(tenDangNhap: string): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/lop-hoc/lay-lop-hoc-cua-mot-giao-vien/${tenDangNhap}`
    );
  }

  guiThongBao(maLop: number, thongBao: any): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/lop-hoc/gui-thong-bao/${maLop}`,
      thongBao
    );
  }
  // Lấy danh sách học viên của một lớp học
  getHocViensDiemDanhhByLopHoc(maLop: number): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/lop-hoc/${maLop}/hoc-vien-diem-danh`
    );
  }

  downloadFile(maLop: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/lop-hoc/${maLop}/download`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  // Phương thức để lấy tên tài liệu
  getFileName(maLop: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/lop-hoc/${maLop}/ten-file`, {
      responseType: 'text',
    });
  }
  suaFileDiemDanh(maLop: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(
      `${this.apiBaseUrl}/lop-hoc/sua-file/${maLop}`,
      formData
    );
  }
  // Thêm hàm mới để lấy thông tin lớp học cho học viên trong khóa học
  getLopHocForHocVienInKhoaHoc(maKhoaHoc: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/lop-hoc/${maKhoaHoc}`);
  }

}
