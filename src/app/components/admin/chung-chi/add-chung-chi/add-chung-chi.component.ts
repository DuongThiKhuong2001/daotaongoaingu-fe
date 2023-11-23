import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { LoaiLopService } from 'src/app/services/loai-lop.service';

@Component({
  selector: 'app-add-chung-chi',
  templateUrl: './add-chung-chi.component.html',
  styleUrls: ['./add-chung-chi.component.css'],
})
export class AddChungChiComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddChungChiComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private chungChiService: ChungChiService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {}

  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    tenChungChi: ['', [Validators.required]],
    moTa: ['', [Validators.required]],
    lePhiThi: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
  });

  savetypeclass() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      this.chungChiService.themChungChi(formData).subscribe({
        next: (data) => {
          console.log(data);

          this.toastr.success('Thêm chứng chỉ thành công!');
          this.closePopup();
        },
        error: (err) => {
          this.toastr.error(err);
        },
      });
    }
  }
}

