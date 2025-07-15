import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewEncapsulation } from '@angular/core';
import { ContentService, Content } from 'src/app/services/content.service';

@Component({
  selector: 'app-study-modules',
  standalone: true,
  imports: [CommonModule, IonicModule], // IMPORTANTE
  encapsulation: ViewEncapsulation.None,
  templateUrl: './study-modules.page.html',
  styleUrls: ['./study-modules.page.scss'],
})
export class StudyModulesPage implements OnInit {
  modules: Content[] = [];

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit() {
    this.contentService.getAllContent().subscribe((res) => {
      this.modules = res;
    });
  }

  openModule(module: Content) {
    this.router.navigate(['/study-module-detail'], {
      state: { module },
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
