import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverviewItem } from 'src/app/models/overviewItem';
import { SessionAudio } from 'src/app/models/sessionaudio';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-session-audio-overview',
  templateUrl: './session-audio-overview.component.html',
  styleUrls: ['./session-audio-overview.component.scss']
})
export class SessionAudioOverviewComponent implements OnInit {
  sessionAudioFiles: OverviewItem[];

  sessionaudio_subscription: Subscription;

  constructor(private overviewService: OverviewService) { }

  ngOnInit(): void {
    this.sessionaudio_subscription = this.overviewService.getOverviewItems('sessionaudio').subscribe(sessionAudioFiles =>{
      this.sessionAudioFiles = sessionAudioFiles;
    });
  }

  ngOnDestroy(){
    if(this.sessionaudio_subscription) this.sessionaudio_subscription.unsubscribe();
  }

}
