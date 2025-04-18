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
    horasSolicitadas: '',
    motivo: '',
  });

  ngOnInit(): void {}

  onSubmit() {
    this.horasextrasService.createHorasextras(this.horasextras).subscribe({
      next: () => this.router.navigate(['/horasextras'], {
        state: { msgInfo: 'Solicitud de horas extras enviada correctamente.' }
      }),
      error: (err) => console.error('Error al crear horas extras', err)
    });
  }
}
