import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(private dataService: DataService) {}

  myData;
  sortedData = [];
  isDataLoaded = false;
  sortData = () => {

    this.myData.forEach((d) => {
      const dataIndex = this.sortedData.findIndex(s => s.category === d.category);
      if (dataIndex === -1) {
        this.sortedData.push({ category: d.category, totalQuantity: 0 });
      } else {
        this.sortedData[dataIndex].totalQuantity += d.total_qty;
      }
    });
  };

  setGraphParameters = () => {
    this.barChartLabels = this.sortedData.map(d => d.category);
    this.barChartData = [
      {
        data: this.sortedData.map((d) => d.totalQuantity),
        label: 'Total Quantity',
      },
    ];
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.myData = data;
      this.sortData();
      this.setGraphParameters();
      this.isDataLoaded = true;
    });
  }

}
