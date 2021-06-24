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
  myData;
  isDataLoaded = false;
  sortedData = []; // Contains objects of { category: ... totalSales: ... }
  pieChartLabels: Label[]; //= this.sortedData.map(d => d.category);

  pieChartData: SingleDataSet;
  constructor(private dataService: DataService) {}

  sortData = () => {
    this.myData.forEach((d) => {
      const dataIndex = this.sortedData.findIndex(s => s.category === d.category);
      if (dataIndex === -1) {
        this.sortedData.push({ category: d.category, totalSales: 0 });
      } else {
        this.sortedData[dataIndex].totalSales += d.total_amount;
      }
    });

    let totalSales = this.sortedData.reduce((total, d) => total + Number(d.totalSales), 0);

    this.sortedData.forEach((d, i) => {
      this.sortedData[i].totalSales = `${(d.totalSales / totalSales * 100).toFixed(2)}`;
    });
  };

  setGraphParameters = () => {
    this.pieChartLabels = this.sortedData.map(d => d.category);
    this.pieChartData = this.sortedData.map(d => d.totalSales);
  };

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.myData = data;
      this.sortData();
      this.setGraphParameters();
      this.isDataLoaded = true;
    });
  }
  
  // Pie
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
}
