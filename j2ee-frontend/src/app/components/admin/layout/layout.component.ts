import { Component } from '@angular/core';
import { NavabarComponent } from "../navabar/navabar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavabarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
