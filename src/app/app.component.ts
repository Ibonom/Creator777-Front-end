import { slideInOut } from './animations/slide-in-out';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { screenBreakpointsService } from './services/screen-breakpoints.service';
import { viewManipulation } from './services/view-manipulation.service';
import 'zone.js';
import { Icons } from '@services/icons.service';
import { MetaService } from '@services/meta.service';
import { SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOut],
})
export class AppComponent implements OnInit {
  public innerWidth: number | any;
  faBars = faBars;
  @ViewChild('hamburgermenu') hamburgerMenu: ElementRef | undefined;
  @ViewChild('sidebar', { static: false }) sidebar: ElementRef | undefined;

  constructor(
    public screenBreakpoints: screenBreakpointsService,
    public viewManipulation: viewManipulation,
    public icons: Icons,
    private meta: MetaService,
    public settings: SettingsService
  ) {
    this.innerWidth = window.innerWidth;
    this.meta.updateMetaInfo(
      this.settings.getSetting('meta_data_title_global'),
      this.settings.getSetting('meta_data_description_global'),
      this.settings.getSetting('keywords_global')
    );
  }

  @HostListener('window:resize') onResize() {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {}
}
