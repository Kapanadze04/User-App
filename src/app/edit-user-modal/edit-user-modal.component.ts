import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent {
  @Input() userData: any;
  @Output() saveChanges = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();
  showModal: boolean = false;




  

  

  

  onSaveChanges(): void {

    this.saveChanges.emit(this.userData);
    this.closeModal.emit();
  }

  onCloseModal(): void {
    this.closeModal.emit();
}









}
