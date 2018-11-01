import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      mensaje => console.log('termmino', mensaje),
    ).catch( error => console.log( 'Error en la promera, ' + error));

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        if (contador === 3) {
          clearInterval(intervalo);
          resolve(true);
        }

      }, 1000);

    });

  }

}
