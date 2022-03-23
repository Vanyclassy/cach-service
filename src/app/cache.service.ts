import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Joke {
  id: number;
  joke: string;
  categories: Array<string>;
}

export interface JokeResponse {
  type: string;
  value: Array<Joke>;
}

const API_ENDPOINT = 'https://api.icndb.com/jokes/random/5?limitTo=[nerdy]';
const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})

export class CacheService {
  private cache$!: Observable<Array<Joke>>;

  constructor(private http: HttpClient) { }

  // Возвращает поток, который фиксирует список шуток
  get jokes() {
    if (!this.cache$) {
      // Делаем потом горячим
      this.cache$ = this.requestJokes().pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cache$;  
  }

  // запрос GET для получения списка шуток
  private requestJokes() {
    return this.http.get<JokeResponse>(API_ENDPOINT).pipe(
      map(response => response.value)
    );
  }
}
