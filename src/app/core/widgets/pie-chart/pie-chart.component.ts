import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "z-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartWidget implements OnInit {
  @Input() data: PieChartData;
  @Input() size: number[];
  results: { name: string; value: number }[];
  colors: { domain: string[] };

  constructor() {}

  ngOnInit(): void {
    if (this.data) this.loadChart();
  }

  private loadChart() {
    this.results = this.data.labels.map(({ name, value }) => ({ name, value }));
    const scheme = [];
    this.data.labels.filter((o) => scheme.push(o.color));
    this.colors = { domain: scheme };
  }

  onSelect = (event) =>
    (this.results = this.results.filter((o) => o.name !== event.name));
}

interface PieChartData {
  resource: string;
  labels: _Label[];
}

interface _Label {
  name: string;
  value: number;
  percent: string;
  color?: string;
}
