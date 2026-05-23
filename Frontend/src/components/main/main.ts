import { Component, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  imports: [],
  standalone: true,
  templateUrl: './main.html',
})
export class Main implements OnInit {
  title = 'Dashboard Ventas';
  reporteVentas = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerReporte();
  }

  obtenerReporte(): void {
    this.http.get<any>('http://localhost:8080/api/reporte-ventas')
      .subscribe({
        next: (res) => {
          if (res && res.payload) {
            this.reporteVentas.set(res.payload);
          }
        },
        error: (err) => console.error(err)
      });
  }
}