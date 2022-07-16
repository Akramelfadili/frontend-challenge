import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartVisualisationComponent } from 'src/app/chart-visualisation/chart-visualisation.component';

const routes: Routes = [
  {
    path: '',
    component: ChartVisualisationComponent
  },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
