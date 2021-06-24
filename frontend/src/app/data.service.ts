import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data;

  constructor(private http:HttpClient) { 
    this.getData().subscribe(data => {
      this.data = data;
    });
  }

  getData() {
    return this.http.get("http://localhost:3001/api/retrieve-sales");
  }

  getDataForPie = () => {
    let sortedData = [];

    const populateSortedData = () => {
      // Initial population with category and total sales.
      this.data.forEach(d => {
        const dataIndex = sortedData.findIndex(s => s.category === d.category);
        if (dataIndex === -1) {
          sortedData.push({ category: d.category, totalSales: 0 });
        } else {
          sortedData[dataIndex].totalSales += d.total_amount;
        }
      });
    }

    const setTotalSalesAsPercentage = () => {
      const totalSales = sortedData.reduce((total, d) => total + Number(d.totalSales), 0);
      
      sortedData.forEach((d, i) => {
        sortedData[i].totalSales = `${(d.totalSales / totalSales * 100).toFixed(2)}`;
      });
    }

    populateSortedData();
    setTotalSalesAsPercentage();
    return sortedData;
  };

  getDataForGraph(type) {
    let data;
    if (type === "pie") {
      data = this.getDataForPie();
    }
    return data;
  }
}
