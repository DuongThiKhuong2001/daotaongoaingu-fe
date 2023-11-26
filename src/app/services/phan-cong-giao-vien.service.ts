import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhanCongGiaoVienService {
  private readonly API_URL = 'api/phan-cong-giao-vien';

  constructor(private http: HttpClient) { }

  themGiaoVienGacThi(request: any): Observable<any> {
    return this.http.post(`${this.API_URL}/them-gac-thi`, request);
  }
  layNgayHocTheoLop(maLopHoc: number): Observable<any> {
    return this.http.get(`${this.API_URL}/lay-ngay-hoc-theo-lop/${maLopHoc}`);
  }
  layGiaoVienGacThiTheoLichThi(maLichThi: number): Observable<any> {
    return this.http.get(`${this.API_URL}/lay-gv-gac-thi-theo-lich-thi/${maLichThi}`);
  }
  //danh sách lịch gác thi
  layLichThiTheoTenDangNhapGacThi(tenDangNhap: string): Observable<any> {
    return this.http.get(`${this.API_URL}/lay-theo-ten-dang-nhap-gac-thi/${tenDangNhap}`);
  }

  checkGiaoVienDay(maGiaoVien: number, maLichThi: number): Observable<any> {
    return this.http.post(`${this.API_URL}/check-giao-vien-day/${maGiaoVien}/${maLichThi}`, {});
  }

  layGiaoVienGacThiHopLe(maLichThi: number): Observable<any> {
    return this.http.get(`${this.API_URL}/lay-giao-vien-gac-thi-hop-le/${maLichThi}`);
  }
  xoaGiaoVienGacThi(maGiaoVien: number, maLichThi: number): Observable<any> {
    const url = `${this.API_URL}/xoa-gac-thi/${maGiaoVien}/${maLichThi}`;
    return this.http.delete(url);
  }
  themGiaoVienLenDiem(request: any): Observable<any> {
    return this.http.post(`${this.API_URL}/them-len-diem`, request);
  }

  layGiaoVienLenDiemTheoLichThi(maLichThi: number): Observable<any> {
    return this.http.get(`${this.API_URL}/lay-gv-len-diem-theo-lich-thi/${maLichThi}`);
  }
  layGiaoVienLenDiem(maLichThi: number): Observable<any> {
    return this.http.get(`${this.API_URL}/lay-giao-vien-len-diem-hop-le/${maLichThi}`);
  }
  //danh sách cần lên điểm của giáo viên
  layLichThiTheoTenDangNhapLenDiem(tenDangNhap: string): Observable<any> {
    return this.http.get(`${this.API_URL}/lay-lich-thi-theo-ten-dang-nhap-len-diem/${tenDangNhap}`);
  }
  layTheoTenDangNhapLenDiem(tenDangNhap: string): Observable<any> {
    return this.http.get(`${this.API_URL}/lay-theo-ten-dang-nhap-len-diem/${tenDangNhap}`);
  }
}
