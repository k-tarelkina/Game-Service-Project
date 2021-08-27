import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  @Output() search = new EventEmitter<string>();

  searchGroup = new FormGroup({
    search: new FormControl(''),
  });

  submit() {
    this.search.emit(this.searchGroup.value.search);
  }
}
