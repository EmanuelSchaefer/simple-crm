import { Component, NgModule, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatProgressBarModule, MatDatepickerModule, MatInputModule, FormsModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  user!: User;
  userId!: string;
  birthDate: Date = new Date();
  loading = false;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  ngOnInit(): void {

  }

  async saveUser() {
    if (this.user) {
      this.loading = true;
      const userDocumentRef = doc(this.firestore, 'users', this.userId);
      const userData = JSON.parse(JSON.stringify(this.user));

      try {
        await updateDoc(userDocumentRef, userData);
        this.loading = false;
        this.dialogRef.close();
      } catch (error) {
        console.error('Fehler beim Speichern des Benutzers:', error);
        this.loading = false;
      }
    }
  }

}