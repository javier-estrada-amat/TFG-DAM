import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../common/header/header.component";
import { MatIcon } from '@angular/material/icon';
import { AuthService } from 'app/auth/auth.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MatIcon],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  environment = environment;
  public auth = inject(AuthService);
}
