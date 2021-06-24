import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import * as moment from 'moment';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  rows = [];
  columns = [];

  constructor(private dataService: DataService) {}

  isDataLoaded = false;
  data;

  sortData = () => {
    // Order data by total_amount, descending.
    this.data.sort((a, b) => a.total_amount - b.total_amount);

    // Format the date and dollar amount.
    this.data.forEach((d, i) => {
      this.data[i].order_date = moment(d.order_date).format('DD-MMM-YYYY');
      this.data[i].total_amount = `$${new Number(d.total_amount).toLocaleString(
        'eu-AU'
      )}`;
    });
  };

  setTableParameters = () => {
    const columnNames = Object.keys(this.data[0]);
    this.columns = columnNames.map(c => ({ prop: c }));
    this.rows = this.data.slice(20);
  };

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      this.sortData();
      this.setTableParameters();
      this.isDataLoaded = true;
    });
  }
}
