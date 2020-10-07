import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component"
import { Location } from "@angular/common";
import { of } from "rxjs/internal/observable/of";
import { FormsModule } from "@angular/forms";

describe('HeroDetail', () => {
    let mockActivatedRoute, mockHeroService, mockLocation;
    let fixture: ComponentFixture<HeroDetailComponent>;


    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: {paramMap: {get: () => {'3'}}}
        }
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero'])
        mockLocation = jasmine.createSpyObj(['back'])

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation}
            ]
        })

        fixture = TestBed.createComponent(HeroDetailComponent)
        mockHeroService.getHero.and.returnValue(of({id: 3, name: "Derek", strength: 34}))
    })

    it('should render hero name in h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain("DEREK")
    })

    // fakeAsync and async both solve the problem of working with async code, but ONLY fakeAsync works with Promises and timeouts. anync does not work with timeouts
    it('should call updateHero when save is called', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save2();
        // tick takes in how long you want to fast forward
        // tick(250);

        // tick is simpler and does more work for you to finish up those async calls on the stack
        flush();
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }))

    it('should call updateHero when save is called with promises', async(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        fixture.whenStable().then(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        })
    }))
})