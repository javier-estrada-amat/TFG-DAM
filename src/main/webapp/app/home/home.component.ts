import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../common/header/header.component";
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  environment = environment;

}
