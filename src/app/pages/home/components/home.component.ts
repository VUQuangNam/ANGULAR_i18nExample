import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NoteService } from '../services/note.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteComponent } from '../components/note/create-note/create-note.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  notes: any;
  count: number = 0;

  constructor(
    public dialog: MatDialog,
    private noteService: NoteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listNotes();
  }

  listNotes() {
    this.noteService.list().subscribe(res => {
      this.notes = res.reverse();
      console.log('note', this.notes);
      for (let i = 0; i < this.notes.length; i++)
        this.count += 1;
    })
  }

  createNote() {
    this.dialog.open(CreateNoteComponent).afterClosed().subscribe(() => {
      this.listNotes();
    });
  }

  showAllNote() {
    this.router.navigateByUrl('/pages/home/note');
  }

}
