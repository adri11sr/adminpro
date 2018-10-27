import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() grafico: any = {};
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public leyenda: string = 'Leyenda';
  public doughnutChartType: string = 'doughnut';

  constructor() {

    console.log('Grafico', this.grafico);
/*     console.log('Labels', this.doughnutChartLabels);
    console.log('Datos', this.doughnutChartData);
    console.log('Leyenda', this.leyenda); */

  }

  ngOnInit() {

    console.log('Grafico', this.grafico);
    /* console.log('Labels', this.doughnutChartLabels);
    console.log('Datos', this.doughnutChartData);
    console.log('Leyenda', this.leyenda); */
    this.doughnutChartLabels = this.grafico.labels;
    this.doughnutChartData   = this.grafico.data;
    this.leyenda             = this.grafico.leyenda;

  }

}
