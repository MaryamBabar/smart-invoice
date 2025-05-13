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
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    amount: 0,
    taxRate: 0,
    paymentTerms: '',
    status:'sent',
    
  };
    // List of available statuses in the dropdown
    statuses = ['sent', 'viewed', 'paid', 'overdue'];

  @Output() invoiceCreated = new EventEmitter<any>();

  createInvoice() {
    const { invoiceNumber, date, clientName, amount } = this.invoice;

    if (!invoiceNumber || !date || !clientName || amount <= 0) {
      alert('Please fill all required fields: Invoice Number, Date, Client Name, and Amount');
      return;
    }

    this.invoiceCreated.emit({ ...this.invoice });

    // Reset form
    this.invoice = {
      invoiceNumber: '',
      date: '',
      dueDate: '',
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      amount: 0,
      taxRate: 0,
      paymentTerms: '',
      status: 'sent' // Reset to default status after creation
    };
  }
}
