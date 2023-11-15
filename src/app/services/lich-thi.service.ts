import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LichThiService {
  private apiUrl: string = '/api/lich-thi'; // Đổi URL này thành URL thực tế của bạn

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  layTatCaLichThi(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lay-tat-ca`);
  }

  layLichThi(maLichThi: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lay/${maLichThi}`);
  }

  themLichThi(lichThi: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/them`, lichThi, this.httpOptions);
  }

  suaLichThi(maLichThi: number, lichThi: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/sua/${maLichThi}`, lichThi, this.httpOptions);
  }
  xoaLichThi(maLichThi: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/xoa/${maLichThi}`, this.httpOptions);
  }
  layLichThiKyThi(maKyThi: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lay-theo-ky-thi/${maKyThi}`);
  }
  timPhongTrong(maLichThi: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/phong-thi-trong/${maLichThi}`);
  }
  // Hàm để cập nhật phòng
  capNhatPhong(maLichThi: number, lichThiRequest: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cap-nhat-phong/${maLichThi}`, lichThiRequest, this.httpOptions);
  }

  layHocViensByMaLichThi(maLichThi: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${maLichThi}/hoc-vien-diem-danh`);
  }

  suaFileDiemDanh(maLichThi: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.put(`${this.apiUrl}/sua-file/${maLichThi}`, formData);
  }

  downloadFile(maLichThi: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${maLichThi}/download`, { responseType: 'blob', observe: 'response' });
  }

  layTenFile(maLichThi: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${maLichThi}/ten-file`, this.httpOptions);
  }

  layDanhSachHocVienNhapDiem(maLichThi: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${maLichThi}/ds-hoc-vien-nhap-diem`);
  }
}
