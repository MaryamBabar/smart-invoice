import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {
  @Input() invoices: any[] = [];
  @Output() invoiceSelected = new EventEmitter<any>();

  selectInvoice(invoice: any) {
    this.invoiceSelected.emit(invoice);
  }
}
