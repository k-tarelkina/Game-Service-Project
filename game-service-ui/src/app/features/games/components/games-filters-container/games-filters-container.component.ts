import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GamesOptions} from '../../../../core/services/games-service/games.service';

@Component({
  selector: 'app-games-filters-container',
  templateUrl: './games-filters-container.component.html',
  styleUrls: ['./games-filters-container.component.scss'],
})
export class GamesFiltersContainerComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean | null = false;
  @Output() filtersChange = new EventEmitter<GamesOptions>();
  private _currentFilters$ = new BehaviorSubject<GamesOptions>({});
  private _subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void {
    const sub = this._currentFilters$.subscribe((filters) => {
      this.filtersChange.emit(filters);
    });
    this._subscriptions.add(sub);
  }

  setPrice(price: number | null) {
    if (price === null) {
      const withoutMaxPrice = {...this._currentFilters$.value};
      delete withoutMaxPrice.maxPrice;
      this._currentFilters$.next(withoutMaxPrice);
    } else {
      this._currentFilters$.next({...this._currentFilters$.value, maxPrice: price});
    }
  }

  setTags(tags: string[]) {
    this._currentFilters$.next({...this._currentFilters$.value, tags});
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
