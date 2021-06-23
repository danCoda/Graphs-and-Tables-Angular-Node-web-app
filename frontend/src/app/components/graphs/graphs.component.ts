import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { LineGraphComponent } from '../line-graph/line-graph.component';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
  }
}
