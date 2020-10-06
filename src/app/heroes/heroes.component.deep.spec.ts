import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core"
import { HeroService } from "../hero.service"
import { of } from "rxjs"
import { Hero } from "../hero"
import { By } from "@angular/platform-browser"
import { HeroComponent } from "../hero/hero.component"

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;

    }
}

describe('HeroesComponent (Deep)', () => {
    let fixture: ComponentFixture<HeroesComponent>
    let mockHeroService;
    let HEROES;


    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        HEROES = [
            {id: 1, name: "Derek", strength: 28},
            {id: 2, name: "Sam", strength: 15},
            {id: 3, name: "Blakely", strength: 6},
        ];

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
        })

        fixture = TestBed.createComponent(HeroesComponent)
    })
    
    it('should render each hero as a hero component', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        // run ngOnInit
        fixture.detectChanges()

        const heroComponentsDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent))

        // here we can get the component instance and test the hero object in the component
        expect(heroComponentsDebugElements[0].componentInstance.hero.name).toBe("Derek")

        // here we can test the template and make sure the first debug element found has an anchor tag in it that contains the name of the first hero
        expect(heroComponentsDebugElements[0].query(By.css('a')).nativeElement.textContent).toContain("Derek")

        // here we are just making sure the number of rendered hero components was 3
        expect(heroComponentsDebugElements.length).toBe(3)
    });

    it(`should call heroservice.delete when delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        // run ngOnInit
        fixture.detectChanges()

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))
        heroComponents[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0])
    })

    // this test is just another way of raising the click even on the HeroComponent like we did in the test above this one
    it(`should emit the delete event from the child component`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        // run ngOnInit
        fixture.detectChanges()

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0])
    })

    it('should add new hero to hero list when button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        // run ngOnInit
        fixture.detectChanges()
        const name = "Mr Incredible"
        mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 99}))
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        const addBtn = fixture.debugElement.queryAll(By.css('button'))[0];
        inputEl.value = name;
        addBtn.triggerEventHandler('click', null);
        fixture.detectChanges();

        const newHeroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent
        expect(newHeroText).toContain(name)
    });

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroDebugEls = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerLink = heroDebugEls[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub)
        heroDebugEls[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1')
    })
})