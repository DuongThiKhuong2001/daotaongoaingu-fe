import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BacChungChiService } from 'src/app/services/bac-chung-chi.service';
import { ChungChiService } from 'src/app/services/chung-chi.service';

@Component({
  selector: 'app-add-bac-chung-chi',
  templateUrl: './add-bac-chung-chi.component.html',
  styleUrls: ['./add-bac-chung-chi.component.css'],
})
export class AddBacChungChiComponent implements OnInit {
  ListChungChi: any[] = [];
  constructor(
    private dialogRef: MatDialogRef<AddBacChungChiComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private bacChungChiService: BacChungChiService,
    private chungChiService: ChungChiService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    this.loadChungChi();
  }
  loadChungChi() {
    this.chungChiService.layTatCaChungChi().subscribe((data) => {
      this.ListChungChi = data;
    });
  }
  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    maChungChi: ['', [Validators.required]],
    bac: ['', [Validators.required]],
    diemToiThieu: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    diemToiDa: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
  });

  savetypeBCC() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      this.bacChungChiService.addBacChungChi(formData).subscribe({
        next: (data) => {
          console.log(data);

          this.toastr.success('Thêm bậc chứng chỉ thành công!');
          this.closePopup();
        },
        error: (err) => {
          this.toastr.error(err);
        },
      });
    }
  }
}
