import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {

        mockMessageService = jasmine.createSpyObj(['add'])
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        })

        httpTestingController = TestBed.get(HttpTestingController);
        heroService = TestBed.get(HeroService);
    })

    describe('getHero', () => {  
        it('', () => {
            heroService.getHero(3).subscribe();

            let req = httpTestingController.expectOne('api/heroes/3')
            req.flush({id: 3, name: 'Derek', strength: 25})
        })
    })
})