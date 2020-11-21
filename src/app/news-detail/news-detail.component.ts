import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'angular-news-api';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const article: any = {
    author: 'BBC Sport',
    content: `It is a bit of a battle for who can finish the day top of the table this Saturday.
Chelsea get the ball rolling, knowing a win at Newcastle will send them to the summit of the division.
Villa then h… [+270 chars]`,
    description: 'Follow live text and BBC radio commentary from four Premier League games starting with Newcastle v Chelsea.',
    publishedAt: '2020-11-21T11:07:32.4721786Z',
    source: {id: 'bbc-sport', name: 'BBC Sport'},
    title: 'Premier League: Four games starting with Newcastle v Chelsea',
    url: 'http://www.bbc.co.uk/sport/live/football/54674755',
    urlToImage: 'https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.20.13/images/bbc-sport-logo.png'
};

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {
    public article$: Observable<Article> = this.activatedRoute.paramMap.pipe(
        map(() => window.history.state)
        // mapTo(article)
    );

    public comments: any[] = [
        {
            name: 'Chris Nat',
            date: new Date(),
            avatar: '/assets/images/1.jpg',
            comment: `Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat`,
        },
        {
            name: 'Matt Damon',
            date: new Date(),
            avatar: '/assets/images/2.jpg',
            comment: `Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. `,
        },
        {
            name: 'Seb Willhelm',
            date: new Date(),
            avatar: '/assets/images/3.jpg',
            comment: `Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.`,
        },
    ];

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    public goToArticle(url: string): void {
        // Open original article in new tab
        window.open(url, '_blank');
    }
}
