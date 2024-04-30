import { Component, EventEmitter, Input, Output,  } from '@angular/core';


@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})


export class EditUserModalComponent   {

 
  @Output() saveChanges = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();


  
  originalUserData: any;
  editableUserData: any;
  isFormEdited: boolean = false;
  actionCompleted: boolean = false;

  
  @Input() set userData(value: any) {
    this.originalUserData = value;
    this.editableUserData = { ...value }
  }
  
  
  onSaveChanges(): void {
    this.saveChanges.emit(this.editableUserData);
    this.actionCompleted = true;
  }
  
  onCloseModal(): void {
    this.closeModal.emit();
  }

  checkIfFormEdited(): void {
    this.isFormEdited = 
      this.originalUserData.email !== this.editableUserData.email &&
      this.originalUserData.firstName !== this.editableUserData.firstName &&
      this.originalUserData.lastName !== this.editableUserData.lastName
  }

  isFormInvalid(): boolean {
    return !this.isFormEdited ||
           !this.editableUserData.email ||
           !this.editableUserData.firstName ||
           !this.editableUserData.lastName
  }
}




