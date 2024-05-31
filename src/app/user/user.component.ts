import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers: User[] = [];
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const userCollection = collection(this.firestore, 'users');
    const userCollectionData$ = collectionData(userCollection, { idField: 'customIdName' }) as Observable<User[]>;

    userCollectionData$.subscribe((changes: User[]) => {
      console.log('Received changes from DB', changes);
      this.allUsers = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}