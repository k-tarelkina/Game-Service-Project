import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GamesTagsService} from "../../../../core/services/games-tags-service/games-tags.service";
import {Subscription} from "rxjs";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-games-tags-filter',
  templateUrl: './games-tags-filter.component.html',
  styleUrls: ['./games-tags-filter.component.scss']
})
export class GamesTagsFilterComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();
  @Input() disabled: boolean = false;
  @Output() tagsChange = new EventEmitter<string[]>();
  allTags: string[] = [];
  isLoading = true;
  tagsFormGroup = this.fb.group({});

  constructor(private tagsService: GamesTagsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    const sub = this.tagsService.getAllTags$()
      .subscribe((tags) => {
        this.allTags = tags;
        tags.forEach(tag => {
          this.tagsFormGroup.addControl(tag, this.fb.control(false));
        })
        this.isLoading = false;
      });
    this._subscriptions.add(sub);
  }

  private getSelectedTags(controls: Object) {
    return Object.entries(controls)
      .filter(([tagName, checked]) => checked)
      .map(([tagName]) => tagName)
  }

  reset() {
    this.tagsFormGroup.reset(this.allTags.map(tag => {
      return {
        tag: false
      }
    }));
    this.tagsChange.emit([]);
  }

  submit() {
    const selectedTags = this.getSelectedTags(this.tagsFormGroup.value);
    this.tagsChange.emit(selectedTags);
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
