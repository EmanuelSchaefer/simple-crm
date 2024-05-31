import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  userId = '';
  user: User = new User();
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id !== null) {
        this.userId = id;
        console.log('GOT ID', this.userId);
        this.getUser();
      }
    });
  }

  getUser() {
    const userDoc = doc(this.firestore, 'users', this.userId);
    getDoc(userDoc).then((userSnap) => {
      if (userSnap.exists()) {
        this.user = userSnap.data() as User;
        console.log('Retrieved user', this.user);
      }
    });
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.user;
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.user;
    dialog.componentInstance.userId = this.userId;
  }

}