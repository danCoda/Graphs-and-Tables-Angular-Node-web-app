import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  constructor(private dataService: DataService) {}

  myData: object;

  ngOnInit(): void {
    console.log('Dan. ', this.dataService.getData());
    this.dataService.getData().subscribe(data => {
      this.myData = data;
      console.warn(data); 
    });
  }
}
