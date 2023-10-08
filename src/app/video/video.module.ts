import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './components/manage/manage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ManageComponent],
  imports: [CommonModule, VideoRoutingModule, SharedModule],
})
export class VideoModule {}
