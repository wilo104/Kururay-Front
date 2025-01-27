import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DashboardService]
})
export class DashboardComponent implements OnInit {
  totalVoluntarios: number = 0;
  totalBeneficiarios: number = 0;
  voluntariadosActivos: number = 0;
  totalBenefactores: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.cargarDatosDelBackend(); // Cargar datos reales
    this.generarGraficoVoluntarios(); // Generar gráfico
  }

  cargarDatosDelBackend(): void {
    this.dashboardService.obtenerEstadisticas().subscribe({
      next: (data) => {
        this.totalVoluntarios = data.voluntarios;
        this.totalBeneficiarios = data.beneficiarios;
        this.voluntariadosActivos = data.voluntariados;
        this.totalBenefactores = data.benefactores;
      },
      error: (err) => {
        console.error('Error al cargar las estadísticas:', err);
      },
    });
  }

  generarGraficoVoluntarios(): void {
    new Chart('graficoVoluntarios', {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], // Reemplázalo con datos reales si es necesario
        datasets: [
          {
            label: 'Voluntarios Activos',
            data: [10, 20, 15, 25], // Reemplázalo con datos reales si es necesario
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
}
