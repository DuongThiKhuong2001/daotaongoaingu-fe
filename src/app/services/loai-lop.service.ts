import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaiLopService {
  private baseUrl = '/api/loai-lop'; // Đặt baseUrl tương ứng với địa chỉ API của bạn

  constructor(private http: HttpClient) {}

  // Phương thức để thêm loại lớp
  // themLoaiLop(loaiLop: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/them`, loaiLop);
  // }

  // // Phương thức để lấy tất cả loại lớp
  // layTatCaLoaiLop(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/lay-tat-ca`);
  // }

  // // Phương thức để lấy một loại lớp dựa trên mã
  // layLoaiLop(maLoaiLop: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/lay/${maLoaiLop}`);
  // }

  // // Phương thức để sửa loại lớp
  // suaLoaiLop(maLoaiLop: number, loaiLopMoi: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/sua/${maLoaiLop}`, loaiLopMoi);
  // }

  // // Phương thức để xóa loại lớp
  // xoaLoaiLop(maLoaiLop: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/xoa/${maLoaiLop}`);
  // }
  // Gửi GET request để lấy danh sách LoaiLop
  layTatCaLoaiLop(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay-tat-ca`);
  }

  // Gửi GET request để lấy một LoaiLop cụ thể dựa trên mã LoaiLop
  getLoaiLop(maLoaiLop: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay/${maLoaiLop}`);
  }

  // Gửi POST request để thêm LoaiLop mới
  addLoaiLop(file: File, tenLoaiLop: string, hocPhi: number, tomTatDeCuong: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tenLoaiLop', tenLoaiLop);
    formData.append('hocPhi', hocPhi.toString());
 formData.append('tomTatDeCuong', tomTatDeCuong);
    return this.http.post(`${this.baseUrl}/them`, formData);
  }

  // Gửi PUT request để cập nhật thông tin LoaiLop
  suaLoaiLop(
    maLoaiLop: number,
    file: File,
    tenLoaiLop: string,
    hocPhi: number,
    tomTatDeCuong: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tenLoaiLop', tenLoaiLop);
    formData.append('hocPhi', hocPhi.toString());
    formData.append('tomTatDeCuong', tomTatDeCuong);
    return this.http.put(`${this.baseUrl}/sua/${maLoaiLop}`, formData);
  }

  // Gửi DELETE request để xóa một LoaiLop dựa trên mã LoaiLop
  xoaLoaiLop(maLoaiLop: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/xoa/${maLoaiLop}`);
  }

  // Gửi GET request để tải xuống đề cương của LoaiLop dựa trên mã LoaiLop
  downloadDeCuong(maLoaiLop: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/download-de-cuong/${maLoaiLop}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  // Gửi GET request để lấy tên file đề cương của LoaiLop dựa trên mã LoaiLop
  getDeCuongTen(maLoaiLop: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/de-cuong-ten/${maLoaiLop}`);
  }
}
