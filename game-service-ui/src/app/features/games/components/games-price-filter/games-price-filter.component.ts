import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-games-price-filter',
  templateUrl: './games-price-filter.component.html',
  styleUrls: ['./games-price-filter.component.scss']
})
export class GamesPriceFilterComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Output() priceChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  setPrice(price: number) {
    this.priceChange.emit(price);
  }
}
