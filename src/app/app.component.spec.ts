import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SwapiService } from './swapi.service';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Card } from './card.model';
import { ResourceType } from './resource-type.enum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnakeToTitleCasePipe } from './snake-to-title-case.pipe';
import { MatCardModule } from '@angular/material/card';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let swapiService: SwapiService;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
      ],
      declarations: [AppComponent, CardComponent, SnakeToTitleCasePipe],
      providers: [SwapiService, Title],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    swapiService = TestBed.inject(SwapiService);
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toEqual('Star Wars Card Game');
    expect(component.isLoading).toBeFalsy();
    expect(component.player1Score).toEqual(0);
    expect(component.player2Score).toEqual(0);
    expect(component.commonProperties).toEqual([]);
    expect(component.selectedProperty).toEqual('');
    expect(component.cards).toEqual([]);
    expect(component.battleResult).toEqual('');
    expect(component.battleLog).toEqual([]);
    expect(component.cardAnimationState).toEqual('default');
  });

  it('should set the title', () => {
    const newTitle = 'Star Wars Card Game';
    component.setTitle(newTitle);
    expect(titleService.getTitle()).toEqual(component.title);
  });

  it('should select a resource type and fetch cards', fakeAsync(() => {
    const mockCards: Card[] = [
      {
        name: 'Luke Skywalker',
      },
    ];
    spyOn(swapiService, 'getCards').and.returnValue(of(mockCards));

    component.chooseResource(ResourceType.PEOPLE);

    tick();

    fixture.detectChanges();
    expect(component.cards).toEqual(mockCards);
  }));

  it('should render h1 header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('start a war!');
  });
});
