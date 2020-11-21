import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatProgressBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { NgnewsModule } from 'angular-news-api';

// const newsApiKey = 'b81ca391f24e436f81a26dd254d6e849';
const newsApiKey = '87643e5b6c954f26a5e44ba793d63509';
@NgModule({
    declarations: [
        AppComponent,
        NewsDetailComponent,
        NewsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        NgnewsModule.forRoot({
            key: newsApiKey
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
