import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ContentService, Content } from 'src/app/services/content.service';

@Component({
  selector: 'app-study-module-detail',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, IonicModule], // IMPORTANTE para standalone
  templateUrl: './study-module-detail.page.html',
  styleUrls: ['./study-module-detail.page.scss'],
})
export class StudyModuleDetailPage {
  module: Content | undefined;

  constructor(
    private router: Router,
    private contentService: ContentService,
    private location: Location
  ) {
    const nav = this.router.getCurrentNavigation();
    this.module = nav?.extras?.state?.['module'];
  }

  markAsRead() {
    if (this.module) {
      this.contentService.markAsRead(this.module.id).subscribe(() => {
        this.module!.read = true;
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
