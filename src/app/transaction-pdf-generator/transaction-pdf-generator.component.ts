import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-transaction-pdf-generator',
  templateUrl: './transaction-pdf-generator.component.html',
  styleUrls: ['./transaction-pdf-generator.component.scss']
})
export class TransactionPdfGeneratorComponent {
  @Input() transactionType: 'purchase' | 'sale' = 'purchase';
  @Input() items: any[] = [];

  get totalAmount(): number {
    return this.items.reduce((acc, item) => acc + (item.total || 0), 0);
  }

  generatePDF(): void {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('🧱 TileMart Enterprises', 14, 20);
    doc.setFontSize(12);
    doc.text('GSTIN: 27ABCDE1234F1Z5 | +91-9876543210', 14, 28);
    doc.text('Shivaji Nagar, Pune - 411005', 14, 34);
    doc.setLineWidth(0.5);
    doc.line(14, 38, 195, 38);

    // Title
    doc.setFontSize(14);
    doc.text(`${this.transactionType === 'purchase' ? 'Purchase' : 'Sales'} Invoice`, 14, 46);

    // Table
    autoTable(doc, {
      startY: 52,
      head: [['#', 'Category', 'Product', 'Size', 'Qty', 'Price', 'Total', 'Details']],
      body: this.items.map((item, i) => [
        i + 1,
        item.category,
        item.product,
        item.size,
        item.quantity,
        `₹${item.price}`,
        `₹${item.total}`,
        item.details || '-'
      ]),
      theme: 'striped',
      headStyles: { fillColor: [63, 81, 181] }
    });

    // Footer
    doc.setFontSize(12);
    // doc.text(`Total Amount: ₹${this.totalAmount}`, 14, doc.lastAutoTable.finalY + 10);
    // doc.text('Thank you for your business!', 14, doc.lastAutoTable.finalY + 20);

    doc.save(`${this.transactionType}-invoice.pdf`);
  }
}
