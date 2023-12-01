import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DangKyThiService {
  private apiUrl = '/api/dang-ky-thi'; // Điều chỉnh URL dựa trên cấu hình của bạn

  constructor(private http: HttpClient) { }

  // Lấy danh sách đăng ký theo tên đăng nhập
  layDangKyTheoTenDangNhap(tenDangNhap: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/theo-ten-dang-nhap/${tenDangNhap}`);
  }
  // Lấy danh sách đăng ký theo tên đăng nhập
  laySoLuongDangKyKyThi(maKyThi: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${maKyThi}/count`);
  }
  layDangKyThi(maDangKyThi: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/lay/${maDangKyThi}`);
  }
  layTheoKyThiLTHV(maKyThi: number, maLichThi: number,maHocVien: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/lay-theo-ma-ky-thi-lich-thi-hoc-vien/${maKyThi}/${maLichThi}/${maHocVien}`);
  }
  dsHocVienLichThi(maLichThi: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/danh-sach-hoc-vien-cua-mot-lich-thi/${maLichThi}`);
  }
  layTatCa(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lay-tat-ca`);
  }
  layTheoKyThiConHan(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ky-thi-con-han`);
  }
  // Thêm đăng ký thi mới
  themDangKyThi(dangKyThiRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/dang-ky`, dangKyThiRequest);
  }

  // Cập nhật thông tin đăng ký thi
  capNhatDangKyThi(maDangKyThi: number, dangKyThiRequest: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cap-nhat-trang-thai/${maDangKyThi}`, dangKyThiRequest);
  }
  capNhatLichThi(maDangKyThi: number, dangKyThiRequest: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cap-nhat-lich-thi/${maDangKyThi}`, dangKyThiRequest);
  }
  // Xóa đăng ký thi
  xoaDangKyThi(maDangKyThi: number, ten: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/huy/${maDangKyThi}/${ten}`);
  }
  kiemTraDangKyThi(body:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/kiem-tra`, body);
  }
  getKyThiDaThi(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ky-thi-da-thi`);
  }

  // Lấy danh sách kỳ thi đã thi theo chứng chỉ
  getKyThiDaThiTheoChungChi(date: Date, chungChi: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ky-thi-da-thi-theo-chung-chi?date=${date}&chungChi=${chungChi}`);
  }

  // Lấy danh sách kỳ thi với tất cả các bộ lọc
  getKyThiWithAllFilters(date: Date, thangThi: number, namThi: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ky-thi-with-all-filters?date=${date}&thangThi=${thangThi}&namThi=${namThi}`);
  }
}
