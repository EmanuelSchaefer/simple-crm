import { Component, NgModule, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatProgressBarModule, MatFormFieldModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent implements OnInit {
  user!: User;
  userId!: string;
  loading = false;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

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