import {
  Directive,
  ElementRef,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { SliderComponent } from '../components/slider/slider.component';
import { linkService } from '@services/link.service';

@Directive({
  selector: '[appComponentLoader]',
})
export class DynamicComponentLoaderDirective implements OnInit {
  componentData: { [key: string]: any } = {};

  constructor(
    private viewContainerRef: ViewContainerRef,
    private el: ElementRef,
    private linkService: linkService
  ) {}

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    let parentComponent = this.el.nativeElement;
    if (parentComponent) {
      this.linkService.internalLinksHandler(parentComponent);
      parentComponent
        .querySelectorAll('angular-component')
        .forEach((element: Element) => {
          let name = element.getAttribute('component-name');
          let data = element.getAttribute('component-data');
          let component = this.getComponentClassByName(name);
          if (component) {
            const newComponent =
              this.viewContainerRef.createComponent(component);
            if (data) {
              let parsedData = this.parseData(data);
              if (parsedData) {
                Object.assign(newComponent.instance, parsedData);
              }
            }
            element.appendChild(newComponent.location.nativeElement);
          }
        });
    }
  }

  private getComponentClassByName(name: string | null): Type<any> | null {
    if (name === 'app-slider') {
      return SliderComponent;
    }
    return null;
  }
  private parseData(data: string) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
