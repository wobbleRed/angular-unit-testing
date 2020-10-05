import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { Component, Input } from "@angular/core"
import { HeroService } from "../hero.service"
import { of } from "rxjs"
import { Hero } from "../hero"
import { by } from "protractor"
import { By } from "@angular/platform-browser"

describe('HeroesComponent (Shallow)', () => {
    let fixture: ComponentFixture<HeroesComponent>
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: `<div></div>`
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
    }

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
                FakeHeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent)
    })

    it('should set heros correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3)
    })

    it('should create an li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3)
    })
})