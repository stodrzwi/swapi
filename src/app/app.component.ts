import { Component, OnInit, Pipe } from '@angular/core';
import { SwapiService } from './swapi.service';
import { CardComponent } from './card/card.component';
import { Card } from './card.model';
import { ResourceType } from './resource-type.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('scaleInOut', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('0.5s ease-in-out', style({ transform: 'scale(1)' })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'Star Wars Card Game';
  isLoading: boolean = false;
  ResourceType = ResourceType;
  resourceType: ResourceType = ResourceType.EMPTY;
  player1Card!: Card;
  player2Card!: Card;
  player1Score = 0;
  player2Score = 0;
  commonProperties: string[] = [];
  selectedProperty: string = '';
  cards: Card[] = [];
  battleResult: string = '';
  battleLog: string[] = [];
  cardAnimationState: string = 'default';

  constructor(
    private swapiService: SwapiService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.setTitle(this.title);
  }

  chooseResource(resourceType: ResourceType): void {
    this.isLoading = true;
    this.resourceType = resourceType;
    this.swapiService.getCards(resourceType).subscribe((cards) => {
      this.cards = cards;
      this.shuffleAndSetCards();
      this.isLoading = false;
    });
  }

  shuffleAndSetCards(): void {
    const shuffledCards = this.shuffle(this.cards);
    this.player1Card = shuffledCards[0];
    this.player2Card = shuffledCards[1];
    this.findCommonProperties();
  }

  battle(): void {
    if (this.selectedProperty) {
      const player1Value = this.player1Card[this.selectedProperty];
      const player2Value = this.player2Card[this.selectedProperty];

      if (player1Value > player2Value) {
        this.player1Score++;
      } else if (player1Value < player2Value) {
        this.player2Score++;
      }
    }

    this.shuffleAndSetCards();
  }

  private findCommonProperties(): void {
    if (!this.player1Card || !this.player2Card) {
      return;
    }
    // Filter properties that are numbers or strings containing only numbers and exist in both cards
    this.commonProperties = Object.keys(this.player1Card).filter(
      (property) =>
        Object.keys(this.player2Card).includes(property) &&
        ((typeof this.player1Card[property] === 'number' &&
          typeof this.player2Card[property] === 'number') ||
          (!isNaN(Number(this.player1Card[property])) &&
            !isNaN(Number(this.player2Card[property])))) &&
        typeof this.player1Card[property] !== 'object' &&
        typeof this.player2Card[property] !== 'object'
    );

    // If there are no common properties, set selectedProperty to an empty string
    if (this.commonProperties.length === 0) {
      this.selectedProperty = '';
    } else {
      // Select a random property from the filtered list
      this.selectedProperty =
        this.commonProperties[
          Math.floor(Math.random() * this.commonProperties.length)
        ];

      // Convert selectedProperty values to numbers as API stores them as strings
      this.player1Card[this.selectedProperty] = Number(
        this.player1Card[this.selectedProperty]
      );
      this.player2Card[this.selectedProperty] = Number(
        this.player2Card[this.selectedProperty]
      );
    }
  }

  private shuffle(array: any[]): any[] {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
