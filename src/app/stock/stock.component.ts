import { Component } from '@angular/core';
// import { ChartConfiguration, ChartType } from 'chart.js';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Available' | 'Out of Stock';
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {

  products: Product[] = [
    { name: 'Glossy White Tile', category: 'Wall Tiles', price: 40, stock: 120, status: 'Available' },
    { name: 'Rustic Brown Tile', category: 'Floor Tiles', price: 55, stock: 60, status: 'Available' },
    { name: 'Matte Grey Tile', category: 'Bathroom Tiles', price: 48, stock: 0, status: 'Out of Stock' },
  ];

    chartData = [
    { data: this.products.map(p => p.stock), label: 'Stock Count' }
  ];

  chartLabels = this.products.map(p => p.name);

  // chartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   maintainAspectRatio: false
  // };
}

