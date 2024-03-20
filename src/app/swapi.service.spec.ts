import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SwapiService } from './swapi.service';
import { ResourceType } from './resource-type.enum';
import { Card } from './card.model';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwapiService],
    });
    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cards for a given resource type', () => {
    const mockCards: Card[] = [
      {
        name: 'Luke Skywalker',
      },
    ];
    const resourceType: ResourceType = ResourceType.PEOPLE;

    service.getCards(resourceType).subscribe((cards) => {
      expect(cards).toEqual(mockCards);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${resourceType}`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockCards });
  });

  it('should return a single card for a given URL', () => {
    const mockCard: Card = {
      name: 'Luke Skywalker',
    };
    const mockUrl = 'https://www.swapi.tech/api/people/1';

    service.getCardByUrl(mockUrl).subscribe((card) => {
      expect(card).toEqual(mockCard);
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCard);
  });
});
