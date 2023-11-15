import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KetQuaThiService {

  private baseUrl = 'api/ket-qua-thi';

  constructor(private http: HttpClient) { }

  themKetQuaThi(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/them`, request);
  }

  layTatCaKetQuaThi(): Observable<any> {
    return this.http.get(`${this.baseUrl}/danh-sach`);
  }

  layKetQuaThiTheoId(maKetQuaThi: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay/${maKetQuaThi}`);
  }

  suaKetQuaThi(maKetQuaThi: number, request: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/sua/${maKetQuaThi}`, request);
  }

  xoaKetQuaThi(maKetQuaThi: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/xoa/${maKetQuaThi}`);
  }
  //lấy kêt quả thi theo mã đăng ký
  layKetQuaThiTheoMaDangKy(maDangKy: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay-ket-qua-theo-ma-dang-ky`, {
      params: {
        maDangKy: maDangKy
      }
    });
  }
  importExcel(file: any, maLichThi:any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('maLichThi', maLichThi.toString());
    return this.http.post(`${this.baseUrl}/import`, formData);
  }
}
