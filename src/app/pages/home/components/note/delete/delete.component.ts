import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from '../../../services/note.service';
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.noteService.delete(this.data.noteId).subscribe(res => {
      this.closeDialog();
      this.alertService.changeMessage({
        text: 'Delete Sucsessfully',
        color: 'green'
      });
      this.router.navigateByUrl('/pages/home')
    })
  }

}
