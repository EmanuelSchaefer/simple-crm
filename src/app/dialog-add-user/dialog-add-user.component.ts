import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule,
    FormsModule, MatProgressBarModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})

export class DialogAddUserComponent {
  user = new User();
  birthDate: Date = new Date();
  loading = false;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);
    this.loading = true;
    const usersCollection = collection(this.firestore, 'users');

    addDoc(usersCollection, {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: this.user.birthDate,
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city,
    }).then((docRef) => {
      this.loading = false;
      console.log('Document written with ID: ', docRef.id);
      this.dialogRef.close();
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  }

}