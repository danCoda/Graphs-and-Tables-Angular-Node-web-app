import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { TableComponent } from './components/table/table.component';

import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LineGraphComponent,
    GraphsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
