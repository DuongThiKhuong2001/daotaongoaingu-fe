import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { ThongBao } from 'src/app/models//ThongBao';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { DetailThongBaoComponent } from './detail-thong-bao/detail-thong-bao.component';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-thong-bao',
  templateUrl: './thong-bao.component.html',
  styleUrls: ['./thong-bao.component.css'],
})
export class ThongBaoComponent implements OnInit, OnDestroy {
  ThongBaos: ThongBao[] = [];
  TBChuaDoc: ThongBao[] = [];
  TBDaDoc: ThongBao[] = [];
  selectedNotification!: ThongBao | null;
  isLinear = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(
    private thongBaoService: ThongBaoService,
    private dialog: MatDialog,
    private storageService: StorageService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.thongBaoService.layThongBaoTheoNguoiDungId().subscribe({
      next: (data) => {
        this.ThongBaos = data;
        this.TBChuaDoc = data.filter(
          (item: { trangThai: string }) => item.trangThai === 'ChuaDoc'
        );
        this.TBDaDoc = data.filter(
          (item: { trangThai: string }) => item.trangThai === 'DaDoc'
        );
        // Cập nhật số thông báo chưa đọc
        const chuaDoc = data.filter(
          (item: { trangThai: string }) => item.trangThai === 'ChuaDoc'
        );
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleDeleteAll(): void {
    this.thongBaoService.xoaTatCaThongBaoTheoNguoiDungId().subscribe({
      next: (data) => {
        this.loadNotifications();
        this.toastr.success('Đã xóa tất cả thông báo đã đọc!');
      },
      error: (error) => {
        if (error.error.message === 'Not_Found') {
          this.toastr.warning('Không có thông báo đã đọc!');
        }
      },
    });
  }

  handleDeleteOne(maThongBao: number): void {
    this.thongBaoService.xoaThongBao(maThongBao).subscribe({
      next: (data) => {
        this.loadNotifications();
        console.log(data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleNotificationClick(notification: ThongBao | null): void {
    if (notification) {
      var popup = this.dialog.open(DetailThongBaoComponent, {
        data: {
          notification: notification,
          deleteHandler: this.handleDeleteOne.bind(this),
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
      popup.afterClosed().subscribe((item) => {
        this.loadNotifications();
      });
      if (notification.trangThai === 'ChuaDoc') {
        this.thongBaoService
          .datTrangThaiThongBao(notification.maThongBao)
          .subscribe({
            next: (data) => {
              this.loadNotifications();
            },
            error: (err) => {
              console.error('Error:', err);
            },
          });
      }
    }
  }

  ngOnDestroy(): void {}
}
