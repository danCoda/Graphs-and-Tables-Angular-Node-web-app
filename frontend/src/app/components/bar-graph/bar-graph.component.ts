import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent implements OnInit {
  sortedData = [];
  isDataReady = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];

  constructor(private dataService: DataService) {}


  setGraphParameters = () => {
    this.barChartLabels = this.sortedData.map((d) => d.category);
    this.barChartData = [
      {
        data: this.sortedData.map((d) => d.totalQuantity),
        label: 'Total Quantity',
      },
    ];
  };

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.sortedData = this.dataService.getDataForGraph('bar');
      this.setGraphParameters();
      this.isDataReady = true;
    });
  }
}
