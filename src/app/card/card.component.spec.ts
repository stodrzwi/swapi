import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the card name', () => {
    const cardName = 'Test Card';
    component.card = { name: cardName } as any;
    fixture.detectChanges();
    const cardTitle =
      fixture.nativeElement.querySelector('mat-card-title').textContent;
    expect(cardTitle).toContain(cardName);
  });

  it('should render the selected property value', () => {
    const selectedProperty = 'height';
    const propertyValue = '180';
    component.card = { [selectedProperty]: propertyValue } as any;
    component.selectedProperty = selectedProperty;
    fixture.detectChanges();
    const propertyContent =
      fixture.nativeElement.querySelector('mat-card-content').textContent;
    expect(propertyContent).toContain(propertyValue);
  });

  it('should handle missing card input', () => {
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelector('mat-card');
    expect(cardElement).toBeNull();
  });

  it('should handle missing selectedProperty input', () => {
    component.card = { name: 'Test Card' } as any;
    fixture.detectChanges();
    const cardContent =
      fixture.nativeElement.querySelector('mat-card-content').textContent;
    expect(cardContent.trim()).toBe('');
  });
});
