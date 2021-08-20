import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GamesTagsService} from "../../../../core/services/games-tags-service/games-tags.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import { debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-games-tags-filter',
  templateUrl: './games-tags-filter.component.html',
  styleUrls: ['./games-tags-filter.component.scss']
})
export class GamesTagsFilterComponent implements OnInit, OnDestroy {
  private _tagsDelaySender = new BehaviorSubject<Set<string>>(new Set<string>());
  private _currentCheckedTags = new Set<string>();
  private _subscription = new Subscription();

  allTags$!: Observable<string[]>;
  @Input() disabled: boolean = false;
  @Output() tagsChange = new EventEmitter<string[]>();

  constructor(private tagsService: GamesTagsService) { }

  ngOnInit(): void {
    this.allTags$ = this.tagsService.getAllTags$();
    this.subscribeToTagsSender();
  }

  subscribeToTagsSender() {
    const sub = this._tagsDelaySender
      .pipe(
        debounceTime(1000)
      ).subscribe(tags => {
        this.tagsChange.emit([...tags])
      });
    this._subscription.add(sub);
  }

  handleTag(tag: string, checked: boolean) {
    if (checked) {
      this._currentCheckedTags.add(tag);
    } else if (this._currentCheckedTags.has(tag)){
      this._currentCheckedTags.delete(tag);
    }
    this._tagsDelaySender.next(this._currentCheckedTags);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
