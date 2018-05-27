import { NgForm } from '@angular/forms';
import { ReadEvent } from './../models/read-event';
import { Component, OnInit } from '@angular/core';
import { ReadEventService } from '../read-event.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events = [];
  addEvent = null;
  selected = null;
  editReadEvent = null;
  showTable: boolean;
  showSingle: boolean;
  showEditForm: boolean;
  showCreateForm: boolean;
  showStats: boolean;
  eventCount: number;
  totalHours: number;
  fictionHours: number;
  nonFictionHours: number;
  audioHours: number;
  textHours: number;


  constructor(private service: ReadEventService) { }

  ngOnInit() {
    this.reload();
    this.showMainTable();
  }
  readEventCount = function() {
    this.reload();
    this.eventCount = this.events.length;
  };
  countTotalHours() {
    this.reload();
    let hours = 0;
    this.events.forEach(element => {
      hours += element.hours;
    });
    this.totalHours = hours;
  }
  countFictionHours() {
    this.reload();
    let hours = 0;
    this.events.forEach(element => {
      if (element.isFiction) {
      hours += element.hours;
      }
    });
    this.fictionHours = hours;
  }
  countAudioHours() {
    this.reload();
    let hours = 0;
    this.events.forEach(element => {
      console.log(element);
      if (element.format === "Audio") {
      hours += element.hours;
      }
    });
    this.audioHours = hours;
  }
  countTextHours() {
    this.reload();
    let hours = 0;
    this.events.forEach(element => {
      if (element.format === 'Text') {

      hours += element.hours;
      }
    });
    this.textHours = hours;
  }
  countNonFictionHours() {
    this.reload();
    let hours = 0;
    this.events.forEach(element => {
      if (!element.isFiction) {
      hours += element.hours;
      }
    });
    this.nonFictionHours = hours;
  }

  displayEvent = function(event) {
    this.selected = event;
    this.showSingleEvent();
  };

  displayTable = function() {
    this.showMainTable();
    this.reload();
    this.selected = null;
  };
  // in todo-list.component.ts call the todoService.create(todo) method within the addReadEvent behavior.

  // now you will need to update the local array (todos) by calling your index method again.
  addReadEvent = function(event: ReadEvent) {
    this.service.create(event);
    this.event = new ReadEvent();
    this.reload();
  };
  updateReadEvent = function(event) {
    this.service.updateReadEvent(event).subscribe(
      data => {
        this.todo = new ReadEvent();
        this.editReadEvent = null;
        this.showMainTable();
        this.reload();
      },
      error => console.log('Error deleting todo')
    );
  };
  // In todo-list.component.ts add a deleteReadEvent(id) behavior that uses the ReadEventService to remove a todo by the provided id.
  deleteReadEvent = function(id: number) {
    this.service.destroy(id).subscribe(
      data => {
        this.event = new ReadEvent();
        this.showMainTable();
        this.reload();
      },
      error => console.log('Error deleting todo')
    );
  };

  setEditReadEvent = function(event: ReadEvent) {
    console.log(event);

    this.editReadEvent = event;
    this.showEditEvent();
    console.log(this.editReadEvent);
  };
  hideEditView = function() {
    this.editReadEvent = null;
  };
  onSubmit = function(addEvent: ReadEvent) {
    // this.addEvent.title = form.value.title;
    // this.addEvent.author = form.value.author;
    // this.addEvent.format = form.value.format;
    // this.addEvent.hours = form.value.hours;
    // this.addEvent.isFiction = form.value.isFiction;
    // this.addEvent.date = form.value.date;

    this.service.create(this.addEvent).subscribe(
      data => {
        this.event = new ReadEvent();
        this.showMainTable();
        this.reload();
        // form.reset();
      },
      error => console.log('Error creating todo')
    );
  };
  cancelEdit() {
    this.reload();
    this.showMainTable();
  }
  reload() {
    return this.service
      .index()
      .subscribe(
        data => (this.events = data),
        err => console.error('Error retreiving data')
      );
  }

  showMainTable() {
    this.showTable = true;
    this.showSingle = false;
    this. showEditForm = false;
    this.showCreateForm = false;
    this.showStats = false;

  }
  showSingleEvent() {
    this.showTable = false;
    this.showSingle = true;
    this. showEditForm = false;
    this.showCreateForm = false;
    this.showStats = false;


  }
  showEditEvent() {
    this.showTable = false;
    this.showSingle = false;
    this. showEditForm = true;
    this.showCreateForm = false;
    this.showStats = false;


  }
  showCreateEvent() {
    this.addEvent = new ReadEvent();
    this.showTable = false;
    this.showSingle = false;
    this. showEditForm = false;
    this.showCreateForm = true;
    this.showStats = false;
  }

  showStatsTable() {
    this.updateStats();
    this.showTable = false;
    this.showSingle = false;
    this. showEditForm = false;
    this.showCreateForm = false;
    this.showStats = true;
  }
  updateStats() {
    this.readEventCount();
    this.countTotalHours();
    this.countFictionHours();
    this.countNonFictionHours();
    this.countAudioHours();
    this.countTextHours();
  }
}
