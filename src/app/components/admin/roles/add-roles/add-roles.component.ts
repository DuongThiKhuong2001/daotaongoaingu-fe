import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NhanVienService } from 'src/app/services/nhan-vien.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css'],
})
export class AddRolesComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddRolesComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private nhanVienService: NhanVienService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {}

  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    tenVaiTro: ['', [Validators.required]],
    moTa: ['', [Validators.required]],

  });

  savetypeclass() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      this.nhanVienService.themVaiTro(formData).subscribe({
        next: (data) => {
          console.log(data);

          this.toastr.success('Thêm vai trò thành công!');
          this.closePopup();
        },
        error: (err) => {
          this.toastr.error(err);
        },
      });
    }
  }
}

