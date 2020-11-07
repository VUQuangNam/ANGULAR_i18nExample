import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NoteService } from '../../../services/note.service';
import { NoteModel } from '../../../models/note.model';
import { AlertService } from '../../../../../shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  note: any = {};
  noteId: number;
  date: string;
  time: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.noteId = +this.route.snapshot.paramMap.get('noteId');
    console.log(this.noteId);
    this.getNoteDetail();
  }

  goBack(): void {
    this.location.back();
  }

  getNoteDetail() {
    this.noteService.list().subscribe(res => {
      this.note = res.find(x => x.NoteId === this.noteId);
      this.date = this.note.NoteDate.split('T')[0];
      this.time = this.note.NoteDate.split('T')[1];
    });
  }

  editNote() {
    let noteModel = new NoteModel();
    noteModel.Title = this.note.Title;
    noteModel.Content = this.note.Content;
    noteModel.NoteDate = this.date + 'T' + this.time;
    console.log('form data', noteModel);

    this.noteService.update(noteModel, this.noteId).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Update Successfully!',
        color: 'green'
      });
      this.getNoteDetail();
    })
  }

  deleteNote() {
    this.dialog.open(DeleteComponent, {
      data: { noteId: this.noteId }
    });
  }
}
