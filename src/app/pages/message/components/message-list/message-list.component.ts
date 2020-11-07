import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  constructor() { }
  content: string;
  style: boolean = true
  isActive: number = 1;

  ngOnInit(): void {
  }

  activeTab(value) {
    this.isActive = value;
  }
  openMail() {
    this.style = !this.style
  }
}
