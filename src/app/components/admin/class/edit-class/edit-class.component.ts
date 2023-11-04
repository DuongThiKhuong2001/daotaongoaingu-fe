import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { LichHoc } from './../../../../models/LichHoc';
import { ToastrService } from 'ngx-toastr';
import { HinhThucHoc } from 'src/app/models/LopHoc';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css'],
})
export class EditClassComponent implements OnInit {
  editForm: FormGroup;
  availableLichHoc: any[] = [];
  availablePhongHoc: any[] = [];
  hinhThucHocs: HinhThucHoc[]=[];
  constructor(
    private dialogRef: MatDialogRef<EditClassComponent>,
    private formBuilder: FormBuilder,
    private lopHocService: LopHocService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lopHoc: any;
    },
  ) {
    this.editForm = this.formBuilder.group({
      lichHoc: ['', Validators.required],
      phongHoc: ['', Validators.required],
      // hinhThucHoc: [`${HinhThucHoc.Offline}`, Validators.required],
      hinhThucHoc: ['', Validators.required],
    });
    this.setupPhongHocValidators();
    this.hinhThucHocs = Object.values(HinhThucHoc);
  }

  ngOnInit(): void {
    this.getAvailableLichHoc();
    this.availablePhongHoc = [];

  }
  isOnline(): boolean {
    return this.editForm.get('hinhThucHoc')?.value === HinhThucHoc.Online;
  }
  onLichHocChange(event: any): void {
    const selectedLichHoc = event.value;
    if (selectedLichHoc) {
      this.getAvailablePhongHoc(selectedLichHoc);
    } else {
      this.availablePhongHoc = [];
    }
  }

  getAvailablePhongHoc(maLichHoc: number): void {
    if (!maLichHoc) {
      return;
    }
    this.lopHocService
      .getAvailablePhongHoc(this.data.lopHoc.maLop, maLichHoc)
      .subscribe({
        next: (data) => {
          this.availablePhongHoc = data.sort(
            (a: { tenPhong: string }, b: { tenPhong: any }) =>
              a.tenPhong.localeCompare(b.tenPhong)
          );
        },
        error: (error) => {
          console.error(
            'There was an error while retrieving the phong hoc!',
            error
          );
        },
      });
  }

  getAvailableLichHoc(): void {
    this.lopHocService.getAvailableLichHoc(this.data.lopHoc.maLop).subscribe({
      next: (data) => {
        if(data.message && data.message ==='no'){
          this.toastr.warning('Không có lịch học khả dụng')
        }else{
          this.availableLichHoc = data;
        }
      },
      error: (error) => {
        console.error(
          'There was an error while retrieving the lich hoc!',
          error
        );
      },
    });
  }
  private setupPhongHocValidators(): void {
    const phongHocControl = this.editForm.get('phongHoc');
    const hinhThucHocControl = this.editForm.get('hinhThucHoc');

    if (phongHocControl && hinhThucHocControl) {
      // Subscribe to changes in hinhThucHoc
      this.editForm.get('hinhThucHoc')?.valueChanges.subscribe(hinhThucHoc => {
        if (hinhThucHoc === HinhThucHoc.Online) {
          // If hinhThucHoc is Online, clear validators for phongHoc
          phongHocControl.clearValidators();
          phongHocControl.updateValueAndValidity(); // update value and validation
        } else {
          // If hinhThucHoc is not Online, set required validator for phongHoc
          phongHocControl.setValidators(Validators.required);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const lichHocControl = this.editForm.get('lichHoc');
      const phongHocControl = this.editForm.get('phongHoc');
      const hinhThucHocControl = this.editForm.get('hinhThucHoc');

      if (lichHocControl && hinhThucHocControl) {
        const maLichHoc = lichHocControl.value;
        const hinhThucHoc = hinhThucHocControl.value;

        // Tạo body cho request
        const body: any = {
          maLichHoc: maLichHoc,
          hinhThucHoc: hinhThucHoc
        };

        // Nếu hình thức học không phải là Online, thêm maPhong vào body
        if (hinhThucHoc !== 'Online' && phongHocControl) {
          body.maPhong = phongHocControl.value;
        }

        // Gửi request
        this.lopHocService.capNhatPhongHoc(this.data.lopHoc.maLop, body).subscribe(
          (response) => {
            console.log(response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('There was an error while updating the phong hoc!', error);
          }
        );
      }
    }
  }



  onCancel(): void {
    this.dialogRef.close();
  }
}
