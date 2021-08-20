import { Component, OnInit } from '@angular/core';
import {GamesTagsService} from "../../../../core/services/games-tags-service/games-tags.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-games-tags-filter',
  templateUrl: './games-tags-filter.component.html',
  styleUrls: ['./games-tags-filter.component.scss']
})
export class GamesTagsFilterComponent implements OnInit {
  tags$!: Observable<string[]>;

  constructor(private tagsService: GamesTagsService) { }

  ngOnInit(): void {
    this.tags$ = this.tagsService.getAllTags$();
  }
}
