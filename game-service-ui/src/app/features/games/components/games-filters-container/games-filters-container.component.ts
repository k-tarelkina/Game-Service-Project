import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {GamesOptions} from "../../../../core/services/games-service/games.service";

@Component({
  selector: 'app-games-filters-container',
  templateUrl: './games-filters-container.component.html',
  styleUrls: ['./games-filters-container.component.scss']
})
export class GamesFiltersContainerComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean | null = false;
  @Output() filtersChange = new EventEmitter<GamesOptions>();
  private _currentFilters$ = new BehaviorSubject<GamesOptions>({});
  private _subscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this._subscription = this._currentFilters$.subscribe(filters => {
      this.filtersChange.emit(filters);
    });
  }

  setPrice(price: number) {
    this._currentFilters$.next({...this._currentFilters$.value, maxPrice: price});
  }

  setTags(tags: string[]) {
    this._currentFilters$.next({...this._currentFilters$.value, tags});
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
