import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent {
  @Input() invoice: any;
  today: Date = new Date();

  downloadPDF() {
    const element = document.getElementById('invoice-detail');

    if (!element) {
      console.error('Invoice element not found');
      return;
    }

    const options = {
      margin: 0.5,
      filename: `Invoice-${this.invoice?.invoiceNumber || 'Detail'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
  }
}
