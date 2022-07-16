import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/animated";

import { lastValueFrom } from 'rxjs';
import { JsonData, ChartData } from 'src/app/interfaces/templates';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-chart-visualisation',
  templateUrl: './chart-visualisation.component.html',
  styleUrls: ['./chart-visualisation.component.css']
})




export class ChartVisualisationComponent {
  private chart !: am4charts.XYChart 

  constructor(
    private service: AppService,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) { }

  browserOnly (f: () => void) {
    if (isPlatformBrowser(this._platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  format_volumes_250162 = (data_volumes : JsonData[])  => {
      const data : ChartData[] = []
      for (let i = 0; i < data_volumes.length; i++) {
        data.push({ date: data_volumes[i].date, name: 'name' + i, value: data_volumes[i].volume });
      }
      return data
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
  
  ngAfterViewInit () {
    this.browserOnly(async () => {
       am4core.useTheme(am4themes_kelly);
        const chart = am4core.create('chartdiv', am4charts.XYChart); //create chart
        const volumes_250162 = this.service.getDataVolumes('250162.json'); // get  250162 volumes
        const volumes: JsonData[] = await lastValueFrom(volumes_250162);
        chart.data = this.format_volumes_250162(volumes); //format volumes to be consummed by chart
        this.set_xy_chart_config(chart) // set chart style
        this.chart = chart;
    });
  }

  ngOnDestroy () {
    this.browserOnly(() => {
        this.chart.dispose();
    });
  }

}
