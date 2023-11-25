  import { Component, OnInit, Inject } from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { LopHocService } from './../../../../services/lop-hoc.service';
  import { ThongBaoService } from './../../../../services/thong-bao.service';
  import { LopHoc } from 'src/app/models/LopHoc';
  import { ToastrService } from 'ngx-toastr';

  @Component({
    selector: 'app-gui-thong-bao',
    templateUrl: './gui-thong-bao.component.html',
    styleUrls: ['./gui-thong-bao.component.css'],
  })
  export class GuiThongBaoComponent implements OnInit {
    thongBao = { tieuDe: '', noiDung: '' };

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { lopHoc: LopHoc },
      private lopHocService: LopHocService,
      private thongBaoService: ThongBaoService,
      private toastr: ToastrService,
      private dialogRef: MatDialogRef<GuiThongBaoComponent>
    ) {}
    closePopup() {
      this.dialogRef.close();
    }
    ngOnInit(): void {}

    onSubmit(): void {
      // Kiểm tra xem tiêu đề và nội dung đã được nhập hay chưa
      if (!this.thongBao.tieuDe || !this.thongBao.noiDung) {
        this.toastr.warning(
          'Vui lòng nhập đầy đủ tiêu đề và nội dung thông báo!'
        );
        return;
      }

      this.lopHocService
        .guiThongBao(this.data.lopHoc.maLop, this.thongBao)
        .subscribe({
          next: (data) => {
            this.toastr.success('Gửi thông báo thành công!');
            this.closePopup();
          },
          error: (err) => {
            console.log('Lỗi:', err);
            this.toastr.error('Có lỗi xảy ra khi gửi thông báo.');
          },
        });
    }
  }
