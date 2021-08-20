import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-games-price-filter',
  templateUrl: './games-price-filter.component.html',
  styleUrls: ['./games-price-filter.component.scss']
})
export class GamesPriceFilterComponent implements OnInit {
  @Output() priceEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  setPrice(price: number) {
    this.priceEmitter.emit(price);
  }
}
