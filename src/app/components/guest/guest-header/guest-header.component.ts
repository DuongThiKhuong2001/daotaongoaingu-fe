import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { GuestResgisterAccountComponent } from '../guest-resgister-account/guest-resgister-account.component';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-guest-header',
  templateUrl: './guest-header.component.html',
  styleUrls: ['./guest-header.component.css'],
})
export class GuestHeaderComponent {
  isMenuOpen = false;
  loggedInUsername: string | null = null;
  constructor(
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.loggedInUsername = user.tenTaiKhoan;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  dangky() {
    this.OpenFormDK();
  }
  OpenFormDK() {
    var _popup = this.dialog.open(GuestResgisterAccountComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item)
    });
  }

  
}
