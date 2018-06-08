import { Component, Input, OnInit } from '@angular/core';
import { Environment } from '../environment.model';
import { List } from '../../list';
import { Profile } from '../../auth/profile';
import { AuthService } from '../../auth/auth.service';
import { TdDigitsPipe } from '@covalent/core';

@Component({
  selector: 'qs-environments-list',
  templateUrl: './environments-list.component.html',
  styleUrls: ['./environments-list.component.scss'],
})
export class EnvironmentsListComponent implements OnInit {

  @Input() public environments: List<Environment> = new List<Environment>();
  public profile: Profile = new Profile();
  public summary: any;
  public releases: { name: string, value: number }[];
  public pings: { name: string, value: number }[];

  constructor(private authService: AuthService) {
    this.authService.subscribeProfile()
      .subscribe((profile: Profile) => this.profile = profile);
  }

  ngOnInit(): void {
    this.calculateSummary();
    this.releases = this.calculateReleases();
    this.pings = this.calculatePings();
  }

  calculateSummary(): void {
    let environments: number = 0;
    let releases: number = 0;
    let monitors: number = 0;
    let views: number = 0;
    let pings: number = 0;
    this.environments.list.forEach((environment: Environment) => {
      environments++;
      releases += environment.releases;
      monitors += environment.monitors ? environment.monitors.length : 0;
      views += environment.views ? environment.views : 0;
      pings += environment.pings.valid + environment.pings.invalid;
    });
    this.summary = [
      { name: 'Environments', value: environments, icon: 'developer_board' },
      { name: 'Releases', value: releases, icon: 'new_releases' },
      { name: 'Monitors', value: monitors, icon: 'timelapse' },
      { name: 'Pings', value: pings, icon: 'receipt' },
      { name: 'Views', value: views, icon: 'record_voice_over' },
    ];
  }

  calculateReleases(): { name: string, value: number }[] {
    return this.environments.list
      .map((environment: Environment) => ({ name: environment.title, value: (environment.pings.valid / (environment.pings.valid + environment.pings.invalid)) * 100 || 0 }));
  }

  calculatePings(): { name: string, value: number }[] {
    return this.environments.list.map((environment: Environment) => {
      return { name: environment.title, value: environment.latestPing.duration ? environment.latestPing.duration : 0 };
    });
  }

  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
