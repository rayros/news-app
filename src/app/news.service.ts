import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article, NewsApiService } from 'angular-news-api';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private loadingInternal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public query$: BehaviorSubject<string> = new BehaviorSubject('');
    public loading$: Observable<boolean> = this.loadingInternal$.asObservable();
    public articles$: Observable<Article[]> = this.query$.pipe(
        tap(() => this.loadingInternal$.next(true)),
        map((q) => ({
            language: 'en',
            q
        })),
        switchMap((config) =>
            config.q ? this.newsApiService.everything(config) : this.newsApiService.topHeadlines(config)
        ),
        map(result => result.articles),
        tap(() => this.loadingInternal$.next(false)),
        shareReplay()
    );

    constructor(private newsApiService: NewsApiService) {}
}
