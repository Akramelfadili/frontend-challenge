import { Component} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {  lastValueFrom } from 'rxjs';
import { JsonData, ChartData, Category, DT } from 'src/app/interfaces/templates';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-chart-visualisation',
  templateUrl: './chart-visualisation.component.html',
  styleUrls: ['./chart-visualisation.component.css']
})

export class ChartVisualisationComponent {
  private chart !: am4charts.XYChart 
  data : DT[] = []

  constructor(
    private service: AppService,
  ) { }

  async ngOnInit () {
    const categories = this.service.getCategoriesData();
    const data_categories : Category[] = await lastValueFrom(categories)
    for (let i = 0; i < data_categories.length; i++) {
      this.data.push(
        { value: data_categories[i].id, viewValue: data_categories[i].name }
      );
    }
  }

  set_xy_chart_config = (chart : am4charts.XYChart ) => {
      chart.cursor = new am4charts.XYCursor(); // see cursor placement value on chart 

      const x_axis = chart.xAxes.push(new am4charts.DateAxis());
      x_axis.renderer.grid.template.location = 0;
      x_axis.renderer.grid.template.disabled = true;

      const y_axis = chart.yAxes.push(new am4charts.ValueAxis());
      y_axis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';


      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
  }

  async ngAfterViewInit () {

    const chart = am4core.create('chartdiv', am4charts.XYChart);
    this.set_xy_chart_config(chart)
    this.chart = chart;
  }

  format_volumes = (data_volumes : JsonData[])  => {
    const data : ChartData[] = []
    for (let i = 0; i < data_volumes.length; i++) {
      data.push({ date: data_volumes[i].date, name: 'name' + i, value: data_volumes[i].volume });
    }
    return data
}


  async setCategory ($event : any) {
    const volumes_data = this.service.getDataVolumes($event.value.toString());
    const volumes: JsonData[] = await lastValueFrom(volumes_data);   
    this.chart.data = this.format_volumes(volumes);
  }

  ngOnDestroy () {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
