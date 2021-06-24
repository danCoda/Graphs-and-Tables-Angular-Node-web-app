import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit {
  constructor(private dataService: DataService) {}
  sortedData = [];
  isDataReady = false;

  // Line graph parameters:
  lineChartLabels: Label[];
  lineChartData: ChartDataSets[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  setGraphParameters = () => {
    // Sort x-axis by date:
    this.lineChartLabels = this.sortedData.map((d) => d.date);

    this.lineChartData = [
      {
        data: this.sortedData.map((d) => d.revenue),
        label: 'Revenue ($)',
      },
    ];
  };

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.sortedData = this.dataService.getDataForGraph('line');
      this.setGraphParameters();
      this.isDataReady = true;
    });
  }
}
