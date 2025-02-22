import { Component } from '@angular/core';

@Component({
  selector: 'app-no-data-found',
  standalone: true,
  imports: [],
  templateUrl: './no-data-found.component.html',
  styleUrl: './no-data-found.component.css'
})
export class NoDataFoundComponent {
  reloadData(){
    window.location.reload();
  }
}
