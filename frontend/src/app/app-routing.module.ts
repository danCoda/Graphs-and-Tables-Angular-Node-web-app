import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: 'home', component: GraphsComponent },
  { path: 'sales-analysis', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
