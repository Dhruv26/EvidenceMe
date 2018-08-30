import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ReportsPage } from '../reports/reports';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ReportsPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
