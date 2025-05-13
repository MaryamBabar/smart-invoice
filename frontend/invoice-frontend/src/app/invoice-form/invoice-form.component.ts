import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent {
  invoice = {
    invoiceNumber: '',
    date: '',
    amount: 0
  };

  @Output() invoiceCreated = new EventEmitter<any>();

  createInvoice() {
    if (!this.invoice.invoiceNumber || !this.invoice.date || this.invoice.amount <= 0) {
      alert('Please fill all fields');
      return;
    }

    this.invoiceCreated.emit({ ...this.invoice });
    this.invoice = {
      invoiceNumber: '',
      date: '',
      amount: 0
    };
  }
}
