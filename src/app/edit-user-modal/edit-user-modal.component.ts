import { Component, EventEmitter, Input, Output,  } from '@angular/core';


@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})


export class EditUserModalComponent   {

  // EventEmitter for saving changes and closing modal
  @Output() saveChanges = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();


  // Variables to store original and editable user data
  originalUserData: any;
  editableUserData: any;

  // To set user data and create a deep copy for editing
  @Input() set userData(value: any) {
    this.originalUserData = value;
    this.editableUserData = JSON.parse(JSON.stringify(value))
  }
  
  
  onSaveChanges(): void {
    this.saveChanges.emit(this.editableUserData);
    this.closeModal.emit();
  }
  
  onCloseModal(): void {
    this.closeModal.emit();
  }
}