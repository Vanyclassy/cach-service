import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService, Joke } from '../cache.service';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit {
  jokes$!: Observable<Array<Joke>>;

  constructor(private cacheService: CacheService) { }

  ngOnInit(): void {
    //  Возвращаемое значение
    this.jokes$ = this.cacheService.jokes;
  }

}
