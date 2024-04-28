import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent implements OnChanges  {
  // @Input() userData: any;
  @Output() saveChanges = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();
  showModal: boolean = false;

  originalUserData: any;
  editableUserData: any;

  @Input() set userData(value: any) {
    this.originalUserData = value;
    this.editableUserData = JSON.parse(JSON.stringify(value))
  }



  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.userData && changes.userData.currentValue) {
    //   this.originalUserData = JSON.parse(JSON.stringify(this.userData))
    // }
   
  }

  

  

  onSaveChanges(): void {

    this.saveChanges.emit(this.editableUserData);
    this.closeModal.emit();
  }

  onCloseModal(): void {
    // this.userData = JSON.parse(JSON.stringify(this.originalUserData));
    this.closeModal.emit();
}









}
