// src/app/services/pdf.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  generateSellOrderPdf(order: any) {
    const doc = new jsPDF();

    // 🔹 Company Letterhead / Header
    doc.setFontSize(18);
    doc.text('Choudhar Tiles & Marble', 105, 15, { align: 'center' });

    doc.setFontSize(11);
    doc.text('Address: Baramati, Maharashtra, India', 105, 22, { align: 'center' });
    doc.text('Phone: +91 9876543210 | GST: 27ABCDE1234F1Z5', 105, 28, { align: 'center' });
    doc.line(15, 32, 195, 32); // horizontal line

    // 🔹 Order Info
    doc.setFontSize(12);
    doc.text(`Invoice #${order.id}`, 15, 42);
    doc.text(`Customer: ${order.customer}`, 15, 50);
    doc.text(`Contact: ${order.contact}`, 15, 58);
    doc.text(`Order Date: ${order.orderDate}`, 140, 50);
    doc.text(`Delivery Date: ${order.deliveryDate}`, 140, 58);

    // 🔹 Table for Items
    autoTable(doc, {
      startY: 70,
      head: [['Product', 'Size', 'Quantity', 'Price', 'Total']],
      body: order.items.map((item: any) => [
        item.product,
        item.size,
        item.quantity,
        item.price,
        item.total
      ]),
      theme: 'grid',
      styles: { fontSize: 11 }
    });

    // 🔹 Grand Total
    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.setFontSize(13);
    doc.text(`Grand Total: ₹${order.totalAmount}`, 150, finalY + 10);

    // 🔹 Footer
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 105, 285, { align: 'center' });

    // 🔹 Save or return
    doc.save(`invoice_${order.id}.pdf`);
  }

}
