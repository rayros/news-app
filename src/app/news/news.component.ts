import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { NewsService } from '../news.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    public loading$ = this.newsService.loading$;
    public articles$ = this.newsService.articles$;

    public searchField = new FormControl(this.newsService.query$.value);
    public searchValue$ = this.searchField.valueChanges.pipe(shareReplay());

    constructor(private newsService: NewsService) {
    }

    ngOnInit() {
        this.searchValue$.pipe(
            debounceTime(400),
            tap(query => this.newsService.query$.next(query)),
            takeUntil(this.destroy$)
        )
        .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
