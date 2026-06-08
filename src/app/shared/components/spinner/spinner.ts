import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  imports: [AsyncPipe],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
  private loadingService = inject(LoadingService);

  loading$!: Observable<any>;

  constructor() {}

  ngOnInit() {
    this.loading$ = this.loadingService.loading$;
  }
}
