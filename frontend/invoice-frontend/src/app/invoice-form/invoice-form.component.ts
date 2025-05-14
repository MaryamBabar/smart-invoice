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
    totalAmountWithoutTax: 0,
    amount: 0,
    taxRate: 0,
    totalTax: 0,
    paymentTerms: '',
    status: 'sent',
  };

  statuses = ['sent', 'viewed', 'paid', 'overdue'];

  @Output() invoiceCreated = new EventEmitter<any>();

  updateTaxRateAndPaymentTerms() {
    if (this.invoice.amount <= 5000) {
      this.invoice.taxRate = 10;
      this.invoice.paymentTerms = 'Net 15';
    } else if (this.invoice.amount <= 10000) {
      this.invoice.taxRate = 15;
      this.invoice.paymentTerms = 'Net 30';
    } else {
      this.invoice.taxRate = 20;
      this.invoice.paymentTerms = 'Net 60';
    }
    this.calculateTaxAndDueDate();
  }

  calculateTaxAndDueDate() {
    const taxAmount = (this.invoice.amount * this.invoice.taxRate) / 100;
    this.invoice.totalTax = taxAmount;
    this.invoice.totalAmountWithoutTax = this.invoice.amount; // ✅ Store original amount
    this.invoice.totalAmountWithoutTax = this.invoice.amount - taxAmount;
    this.setDueDate(this.invoice.paymentTerms);
  }
  

  setDueDate(paymentTerms: string) {
    const today = new Date();
    const dueDate = new Date(today);

    if (paymentTerms.toLowerCase() === 'net 15') {
      dueDate.setDate(today.getDate() + 15);
    } else if (paymentTerms.toLowerCase() === 'net 30') {
      dueDate.setDate(today.getDate() + 30);
    } else if (paymentTerms.toLowerCase() === 'net 60') {
      dueDate.setDate(today.getDate() + 60);
    }

    this.invoice.dueDate = dueDate.toLocaleDateString();
  }

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
      totalAmountWithoutTax: 0,
      amount: 0,
      taxRate: 0,
      totalTax: 0,
      paymentTerms: '',
      status: 'sent',
    };
  }
}
