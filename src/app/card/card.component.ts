// card.component.ts
import { Component, Input } from '@angular/core';
import { Card } from '../card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: Card; 
  @Input() selectedProperty!: string;
}
