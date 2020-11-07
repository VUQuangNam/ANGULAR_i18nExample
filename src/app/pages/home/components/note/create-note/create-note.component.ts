import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteModel } from '../../../models/note.model';
import { NoteService } from '../../../services/note.service';
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  note: any = {};
  noteDate: string;
  noteTime: string;

  constructor(
    private noteService: NoteService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CreateNoteComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createNote() {
    let note = new NoteModel();
    note.Title = this.note.Title;
    note.Content = this.note.Content;
    note.NoteDate = this.noteDate + 'T' + this.noteTime;
    console.log(note);

    this.noteService.create(note).subscribe(res => {
      this.closeDialog();
      this.alertService.changeMessage({
        text: 'Successfully!',
        color: 'green'
      });
    })
  }

}
