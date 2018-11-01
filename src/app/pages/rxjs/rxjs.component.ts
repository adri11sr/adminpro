import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObserbable().pipe(
      retry(2)
    ).subscribe(
       numero => console.log('Subs', numero),
       error => console.log('Error en Subs', error),
       () => console.log('El observador terminó')
       );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('La pagina se va a cerrar');
  }

  regresaObserbable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intevalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        /* if (contador === 3) {
          clearInterval(intevalo);
          observer.complete();
        } */

        /* if (contador === 2) {
          clearInterval(intevalo);
          observer.error('Help!');
        } */

      }, 1000);

    }).pipe(
      map( resp => {
        return resp.valor;
      }),
      filter( ( valor, index) => {
       /*  console.log(valor);
        console.log(index); */
        if ((valor % 2) === 1) {
          // Impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );

  }

}
