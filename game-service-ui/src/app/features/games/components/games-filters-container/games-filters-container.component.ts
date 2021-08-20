import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
  selector: 'app-games-filters-container',
  templateUrl: './games-filters-container.component.html',
  styleUrls: ['./games-filters-container.component.scss']
})
export class GamesFiltersContainerComponent implements OnInit, OnDestroy {
  @Output() filtersChange = new EventEmitter<Object>();
  private _currentFilters$ = new BehaviorSubject<Object>({});
  private _subscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this._subscription = this._currentFilters$.subscribe(filters => {
      this.filtersChange.emit(filters);
    });
  }

  setPrice(price: number) {
    this._currentFilters$.next({...this._currentFilters$.value, price});
  }

  setTags(tags: string[]) {
    this._currentFilters$.next({...this._currentFilters$.value, tags});
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
