import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data;

  constructor(private http: HttpClient) {
    this.getData().subscribe((data) => {
      this.data = data;
    });
  }

  getData() {
    return this.http.get('http://localhost:3001/api/retrieve-sales');
  }

  getDataForPie = () => {
    let sortedData = []; // contains category, totalSalesQuantity.

    const populateSortedData = () => {
      // Initial population with category and total sales.
      this.data.forEach((d) => {
        const dataIndex = sortedData.findIndex(
          (s) => s.category === d.category
        );
        if (dataIndex === -1) {
          sortedData.push({ category: d.category, totalSales: 0 });
        } else {
          sortedData[dataIndex].totalSales += d.total_amount;
        }
      });
    };

    const setTotalSalesAsPercentage = () => {
      const totalSales = sortedData.reduce(
        (total, d) => total + Number(d.totalSales),
        0
      );

      sortedData.forEach((d, i) => {
        sortedData[i].totalSales = `${(
          (d.totalSales / totalSales) *
          100
        ).toFixed(2)}`;
      });
    };

    populateSortedData();
    setTotalSalesAsPercentage();
    return sortedData;
  };

  getDataForBar = () => {
    let sortedData = []; // contains category, totalSalesQuantity.

    this.data.forEach((d) => {
      const dataIndex = sortedData.findIndex((s) => s.category === d.category);
      if (dataIndex === -1) {
        sortedData.push({ category: d.category, totalQuantity: 0 });
      } else {
        sortedData[dataIndex].totalQuantity += d.total_qty;
      }
    });
    return sortedData;
  };

  getDataForLine = () => {
    let sortedData = []; // contains date, revenue.

    // Calculate daily revenue and store in sortedData.
    this.data.forEach((d) => {
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

    return sortedData;
  };

  getDataForGraph(type) {
    let data;
    switch (type) {
      case 'pie':
        data = this.getDataForPie();
        break;
      case 'bar':
        data = this.getDataForBar();
        break;
      case 'line':
        data = this.getDataForLine();
        break;
    }

    return data;
  }
}
