import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet, Event, Scroll, NavigationEnd } from '@angular/router';
import { Article } from 'angular-news-api';
import { combineLatest, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { slideInAnimation } from './animations';

const isArticle = (state: any): state is Article => state.title;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
      slideInAnimation
    ]
})
export class AppComponent {
    public article = false;
    private animationsDone$ = new Subject<boolean>();

    constructor(router: Router, viewportScroller: ViewportScroller) {
        router.events.pipe(
            filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd),
        )
        .subscribe(() => {
            if (router.url.startsWith('/article')) {
                this.article = true;
                if (!isArticle(window.history.state)) {
                    router.navigate(['./news']);
                }
            } else {
                this.article = false;
            }
        });
        combineLatest([
            this.animationsDone$,
            router.events.pipe(
                filter((e: Event): e is Scroll => e instanceof Scroll)
            )
        ]).pipe(
            filter(([animationDone]: [boolean, Scroll]) => animationDone === true)
        ).subscribe(([_, e]) => {
            if (e.position) {
                viewportScroller.scrollToPosition(e.position);
            }
        });
    }

    onRouteAnimationDone(done: boolean) {
        this.animationsDone$.next(done);
    }

    public prepareRoute(outlet: RouterOutlet): any {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }

    public goBack(): void {
        window.history.back();
    }
}
