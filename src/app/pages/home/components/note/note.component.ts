import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NoteService } from '../../services/note.service';
import { Location } from '@angular/common';
import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: NoteModel[];

  constructor(
    public dialog: MatDialog,
    private noteService: NoteService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.listNotes();
  }

  createNote() {
    this.dialog.open(CreateNoteComponent).afterClosed().subscribe(() => {
      this.listNotes();
    });
  }

  listNotes() {
    this.noteService.list().subscribe(res => {
      this.notes = res.reverse();
      console.log('note', this.notes);

    })
  }

  goBack(): void {
    this.location.back();
  }

}
