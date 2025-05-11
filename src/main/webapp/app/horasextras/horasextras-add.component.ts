import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HorasextrasService } from 'app/horasextras/horasextras.service';
import { HorasextrasDTO } from 'app/horasextras/horasextras.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validNumeric } from 'app/common/utils';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-horasextras-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './horasextras-add.component.html'
})
export class HorasextrasAddComponent implements OnInit {

  horasextrasService = inject(HorasextrasService);
  router = inject(Router);

  horasextras = new HorasextrasDTO({
    fecha: '',
    horasSolicitadas: null,
    motivo: '',
  });

  isFechaValida(): boolean {
    if (!this.horasextras.fecha) return true; // Si no hay fecha aún
    const hoy = new Date();
    const seleccionada = new Date(this.horasextras.fecha);
    hoy.setHours(0, 0, 0, 0);
    seleccionada.setHours(0, 0, 0, 0);
    return seleccionada <= hoy;
  }

  // isHorasSolicitadasValida(): boolean {
  //   const valor = this.horasextras.horasSolicitadas;
  //   if (valor === null || valor === undefined || valor === '') return false;

  //   const regex = /^(?:[0-9]|[1-9][0-9])(?:\.(0|5))?$/;
  //   return regex.test(String(valor));
  // }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.isFechaValida()) {
      alert('La fecha no puede ser superior a hoy.');
      return;
    }

    // if (!this.isHorasSolicitadasValida()) {
    //   alert('Introduce un número válido de horas (entre 0 y 99, con decimales .0 o .5 solamente).');
    //   return;
    // }

    this.horasextrasService.createHorasextras(this.horasextras).subscribe({
      next: () => this.router.navigate(['/horasextras'], {
        state: { msgInfo: 'Solicitud de horas extras enviada correctamente.' }
      }),
      error: (err) => console.error('Error al crear horas extras', err)
    });
  }

}
