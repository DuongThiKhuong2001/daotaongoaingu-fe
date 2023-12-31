import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KyThiService {
  private apiUrl = '/api/ky-thi';
  constructor(private http: HttpClient) {}

  getDaysOfMonth(year: string, month: string): Observable<Date[]> {
    const url = `${this.apiUrl}/danh-sach-ngay?nam=${year}&thang=${month}`;
    return this.http.get<Date[]>(url);
  }

  themKyThi(kyThiRequest: any): Observable<any> {
    const url = `${this.apiUrl}/them`;
    return this.http.post(url, kyThiRequest);
  }

  layTatCaKyThi(): Observable<any> {
    const url = `${this.apiUrl}/tat-ca`;
    return this.http.get(url);
  }
  getKhoaHocByMonthYear(thang: number, nam: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/lay-danh-sach-theo-thang-nam?thang=${thang}&nam=${nam}`
    );
  }

  // Hàm để lấy danh sách kỳ thi theo chứng chỉ
  getKhoaHocByChungChi(maChungChi: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/lay-danh-sach-theo-chung-chi?maChungChi=${maChungChi}`
    );
  }
  getDistinctNamKhoaHoc(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/lay-danh-sach-nam`);
  }
  suaKyThi(maKyThi: number, kyThiRequest: any): Observable<any> {
    const url = `${this.apiUrl}/sua/${maKyThi}`;
    return this.http.put(url, kyThiRequest);
  }
  xoaKyThi(maKyThi: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/xoa/${maKyThi}`);
  }
  getKyThiConHan(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lay-danh-sach-con-han`);
  }

  // Lấy danh sách kỳ thi còn hạn theo mã chứng chỉ
  getKyThiConHanTheoChungChi(maChungChi: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/lay-danh-sach-con-han-theo-chung-chi?maChungChi=${maChungChi}`
    );
  }

  // Lấy danh sách kỳ thi còn hạn theo tháng và năm
  getKyThiConHanTheoThangNam(thang: number, nam: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/lay-danh-sach-con-han-theo-thang-nam?thang=${thang}&nam=${nam}`
    );
  }

  // Add teacher to a test
  themGiaoVienRaDe(maKyThi: number, maTaiKhoan: number): Observable<any> {
    const url = `${this.apiUrl}/them-giao-vien-ra-de/${maKyThi}/${maTaiKhoan}`;
    return this.http.put(url, {});
  }

  // Get list of teachers for a test
  layDanhSachGiaoVienRaDe(maKyThi: number): Observable<any> {
    const url = `${this.apiUrl}/danh-sach-giao-vien-ra-de/${maKyThi}`;
    return this.http.get(url);
  }

  // Get list of tests for a teacher
  layDanhSachKyThiCuaGiaoVien(tenDangNhap: string): Observable<any> {
    const url = `${this.apiUrl}/danh-sach-ky-thi-cua-giao-vien/${tenDangNhap}`;
    return this.http.get(url);
  }

  // Get list of valid teachers for test assignment
  layDanhSachGiaoVienHopLeChoKyThi(maKyThi: number): Observable<any> {
    const url = `${this.apiUrl}/ds-giao-vien-hop-le/${maKyThi}`;
    return this.http.get(url);
  }

  // Delete a teacher from a test
  xoaGiaoVienRaDe(maKyThi: number, maTaiKhoan: number): Observable<any> {
    const url = `${this.apiUrl}/xoa-giao-vien/${maKyThi}/${maTaiKhoan}`;
    return this.http.delete(url);
  }
}
