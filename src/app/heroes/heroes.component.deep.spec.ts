import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core"
import { HeroService } from "../hero.service"
import { of } from "rxjs"
import { Hero } from "../hero"
import { By } from "@angular/platform-browser"
import { HeroComponent } from "../hero/hero.component"

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
                HeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
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
    })
})