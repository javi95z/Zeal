import { Component, Input } from "@angular/core";

@Component({
  selector: "z-progress-track",
  templateUrl: "./progress-track.component.html",
  styleUrls: ["./progress-track.component.scss"],
})
export class ProgressTrackComponent {
  @Input() data: ProgressTrack;
}

interface ProgressTrack {
  title?: string;
  percent: number;
  data1: DataChunk;
  data2: DataChunk;
  data3: DataChunk;
}

interface DataChunk {
  label: string;
  value: string;
}
