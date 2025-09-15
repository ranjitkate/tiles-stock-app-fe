import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

   async generateProductLabels(purchase: any) {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const labelWidth = 85;  // width of each label
    const labelHeight = 60; // height of each label
    const margin = 12;

    let x = margin;
    let y = margin;
    let count = 0;

    for (let i = 0; i < purchase.quantity; i++) {
      // generate QR code with product info
      const qrData = `
       Category: ${purchase.category}  
       Product: ${purchase.product}
        Size: ${purchase.size}
        Weight: ${purchase.weight}
        Price: ₹${purchase.price}
        Date: ${purchase.purchaseDate}
      `;
      const qrCode = await QRCode.toDataURL(qrData);

      // draw border
      doc.rect(x, y, labelWidth, labelHeight);

      // add product info
      doc.setFontSize(10);
      doc.text(`Category : ${purchase.category}`, x + 5, y + 10);
      doc.text(`Product : ${purchase.product}`, x + 5, y + 15);
      doc.text(`Size: ${purchase.size}`, x + 5, y + 20);
      doc.text(`Weight: ${purchase.weight}`, x + 5, y + 25);
      doc.text(`Price: ₹${purchase.price}`, x + 5, y + 30);
      doc.text(`Date: ${purchase.purchaseDate}`, x + 5, y + 35);

      // add QR
      doc.addImage(qrCode, 'PNG', x + 40, y + 5, 15, 15);

      // move cursor for next label
      x += labelWidth + margin;
      count++;

      // if labels exceed row limit, move to next row
      if (x + labelWidth > pageWidth - margin) {
        x = margin;
        y += labelHeight + margin;
      }

      // if page full, add new page
      if (y + labelHeight > pageHeight - margin) {
        doc.addPage();
        x = margin;
        y = margin;
      }
    }

    doc.save(`${purchase.product}_labels.pdf`);
  }
}
