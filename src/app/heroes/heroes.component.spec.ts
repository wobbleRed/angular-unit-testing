import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
    let component: HeroesComponent
    let heroesArr;
    let mockHeroService;

    beforeEach(() => {
        heroesArr = [
            {id: 1, name: 'Derek', strength: 25},
            {id: 1, name: 'Sam', strength: 18},
            {id: 1, name: 'Blakely', strength: 8},
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'], )

        component = new HeroesComponent(mockHeroService);
    })

    describe('delete', () => {
        it('should remove the hero from the list', () => {
            // arrange
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = heroesArr

            // act
            component.delete(heroesArr[0])

            // assert
            // here we are only testing the array length of heroes, a better test would be to make sure the actual hero we wanted was removed or 
            // that the other remaining 2 heroes are both the ones we didnt want deleted...
            expect(component.heroes.length).toBe(2)
        })

        it('should call deleteHero on the service', () => {
            // arrange
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = heroesArr

            // act
            component.delete(heroesArr[0])

            // assert
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroesArr[0]);
        })
    })

})