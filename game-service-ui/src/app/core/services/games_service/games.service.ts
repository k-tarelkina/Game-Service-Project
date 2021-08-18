import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {Game} from "../../models/game.model";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private httpService: HttpService<Game>) { }
}
