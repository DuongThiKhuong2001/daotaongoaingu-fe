import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-staff',
  template: ` <app-header></app-header> `,

  styles: [``],
})
export class StaffComponent {
  private roles: string = '';
  isLoggedIn = false;
  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    const user = this.storageService.getUser();
    this.roles = user.quyen;
   if (!this.isLoggedIn) {
     this.router.navigate(['/trang-chu']);
   } else if (this.roles !== 'NhanVien') {
     this.router.navigate(['/403']);
   }
  }
}
