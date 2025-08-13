import { Component } from '@angular/core';
interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  customerName: string;
  contact: string;
  orderDate: string;
  deliveryDate?: string;
  paymentStatus: 'Pending' | 'Paid';
  orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  remarks?: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent {
  orders: Order[] = [
    {
      orderId: 'ORD001',
      customerName: 'Rahul Sharma',
      contact: 'rahul@example.com',
      orderDate: '2025-07-25',
      deliveryDate: '2025-07-30',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
      items: [
        { productName: 'Glossy White Tile', quantity: 50, price: 40 },
        { productName: 'Rustic Brown Tile', quantity: 20, price: 55 }
      ],
      remarks: 'Handle with care'
    },
    {
      orderId: 'ORD002',
      customerName: 'Priya Mehta',
      contact: 'priya@example.com',
      orderDate: '2025-07-28',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      items: [
        { productName: 'Matte Grey Tile', quantity: 30, price: 48 }
      ]
    }
  ];

  getTotalAmount(items: OrderItem[]): number {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }
}
