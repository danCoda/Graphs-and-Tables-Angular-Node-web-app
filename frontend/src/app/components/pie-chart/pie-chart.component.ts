import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  sortedData = []; // Contains objects of { category: ... totalSales: ... }
  isDataReady = false;

  // Graph parameters:
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];

  constructor(private dataService: DataService) {}

  setGraphParameters = () => {
    this.pieChartLabels = this.sortedData.map((d) => d.category);
    this.pieChartData = this.sortedData.map((d) => d.totalSales);
  };

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.sortedData = this.dataService.getDataForGraph('pie');
      this.setGraphParameters();
      this.isDataReady = true;
    });
  }
}
