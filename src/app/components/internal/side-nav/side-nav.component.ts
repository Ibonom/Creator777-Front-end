import { Component, ElementRef, HostListener } from '@angular/core';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ApiCallback } from '@services/api-callback.service';
import { screenBreakpointsService } from '@services/screen-breakpoints.service';
import { viewManipulation } from '@services/view-manipulation.service';
import { ResponseTypedData } from '@models/Api/responseApi.model';
import { filter, isArray } from 'lodash';
import { MenuAttributes } from '@models/Api/menu.model';
import { SocialMediaAttributes } from '@models/Api/socialMedia.model';
@Component({
  selector: 'app-sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class NavBarComponent {
  faArrowLeftLong = faArrowLeftLong;
  public innerWidth: number | any;
  menuArray: MenuAttributes[] | [] = [];
  smArray: SocialMediaAttributes[] | [] = [];
  elwewnt: EventTarget | null = null;
  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    this.elwewnt = e.target;
  }
  @HostListener('window:resize') onResize() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('document:click', ['$event'])
  hideOnClickOutside(ev: MouseEvent) {
    ev.stopPropagation();
    if ((ev.target as Element).id === 'hamburger-menu') {
      return;
    }
    if (!this.elRef.nativeElement.contains(ev.target)) {
      this.viewManipulation.toogleView();
    }
  }

  constructor(
    public screenBreakpoints: screenBreakpointsService,
    public viewManipulation: viewManipulation,
    private apiCallback: ApiCallback,
    private elRef: ElementRef
  ) {
    this.innerWidth = window.innerWidth;
    this.apiCallback
      .fetchData('menu')
      .subscribe((fetchedMenu: ResponseTypedData<MenuAttributes[]>) => {
        if (isArray(fetchedMenu.data)) {
          this.menuArray = fetchedMenu.data;
        }
      });
    this.apiCallback
      .fetchData('social-media')
      .subscribe((fetchedSM: ResponseTypedData<SocialMediaAttributes[]>) => {
        if (isArray(fetchedSM.data)) {
          this.smArray = filter(fetchedSM.data, ['available', 1]);
        }
      });
  }
}
