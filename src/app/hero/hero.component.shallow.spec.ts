import { expressionType } from "@angular/compiler/src/output/output_ast"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { HeroComponent } from "./hero.component"

describe('HeroComponent (Shallow Test)', () => {
    let fixture: ComponentFixture<HeroComponent>

    beforeEach(() => {
        // here we are using the TestBed utility to configure a testing module. This is where we define which component we want brought into the file to test (HeroComponent)
        TestBed.configureTestingModule({
            declarations: [HeroComponent],

            // This line tells angular not to error when if finds an unknown attribute or an unknown element, just ignore it FOR THIS MODULE
            // this is nice but it can be bad if we have an error in our template file like we use <za> instead of <a> for an anchor tag it will ignore that error
            // or if we mis spell a directive or something
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroComponent)
    })

    // this is just checking the component instance that the hero object is what we set it too
    it('has the correct hero', () => {
        fixture.componentInstance.hero = {id: 1, name: "Derek", strength: 25}

        expect(fixture.componentInstance.hero.name).toEqual("Derek")
    })

    // This test is much better because its an actual integration test where we are testing the native component for the hero name in the actual html
    it('should render the hero name in an anchor tag', () => {
        fixture.componentInstance.hero = {id: 1, name: "Derek", strength: 25}
        fixture.detectChanges();
        // here we use the debugElement which is a wrapper around the native element that gives us a few more methods to work with like getting access to an element
        // by its directive
        let debugEl = fixture.debugElement.query(By.css('a'));

        expect(debugEl.nativeElement.textContent).toContain("Derek")
    })
})