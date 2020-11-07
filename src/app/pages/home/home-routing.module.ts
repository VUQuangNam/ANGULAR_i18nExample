import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import { HomeComponent } from './components/home.component';

import { NoteComponent } from './components/note/note.component';
import { EditNoteComponent } from './components/note/edit-note/edit-note.component';
import { ProfileDoctorComponent } from './components/profile-doctor/profile-doctor.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'doctor',
    component: ProfileDoctorComponent
  },
  {
    path: 'note',
    component: NoteComponent
  },
  {
    path: 'note/:noteId',
    component: EditNoteComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
