// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SwapiService } from './swapi.service';
import { SnakeToTitleCasePipe } from './snake-to-title-case.pipe';

@NgModule({
  declarations: [AppComponent, CardComponent, SnakeToTitleCasePipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [SwapiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
