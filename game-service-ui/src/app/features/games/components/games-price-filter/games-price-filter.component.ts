import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-games-price-filter',
  templateUrl: './games-price-filter.component.html',
  styleUrls: ['./games-price-filter.component.scss'],
})
export class GamesPriceFilterComponent {
  @Input() disabled: boolean = false;
  @Output() priceChange = new EventEmitter<number | null>();

  setPrice(price: number) {
    this.priceChange.emit(price);
  }

  resetPrice() {
    this.priceChange.emit(null);
  }
}
