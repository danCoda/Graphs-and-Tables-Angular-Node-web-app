import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit {
  constructor(private dataService: DataService) {}

  myData;

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.myData = data;
      this.setGraphData();
    });
  }

  lineChartLabels: Label[];
  lineChartData: ChartDataSets[] = [];

  setGraphData(): void {
    let sortedData = []; // Contains objects of { date: ... revenue: ... }

    const sortData = () => {
      // Sorts the imported data; calculates the daily total revnue (using total_amount).

      // Calculate daily revenue and store in sortedData.
      this.myData.forEach((d) => {
        const date = moment(d.order_date).format('DD-MMM-YY');
        const dataIndex = sortedData.findIndex((s) => s.date === date);
        if (dataIndex === -1) {
          sortedData.push({ date, revenue: 0 });
        } else {
          sortedData[dataIndex].revenue += d.total_amount;
        }
      });

      // Sort sortedData elements by date.
      sortedData.sort((a, b) => moment(a.date).diff(b.date));
    };

    const setChartLabel = () => {
      this.lineChartLabels = sortedData.map((d) => d.date);
    };

    const setChartData = () => {
      this.lineChartData = [
        {
          data: sortedData.map((d) => d.revenue),
          label: 'Revenue ($)',
        },
      ];
    };

    sortData();
    setChartLabel();
    setChartData();
  }

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
}
