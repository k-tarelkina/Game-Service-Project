import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-games-search-form',
  templateUrl: './games-search-form.component.html',
  styleUrls: ['./games-search-form.component.scss']
})
export class GamesSearchFormComponent {
  @Output() search = new EventEmitter<string>();

  searchGroup = new FormGroup({
    search: new FormControl(''),
  });

  submit() {
    this.search.emit(this.searchGroup.value.search);
  }
}
