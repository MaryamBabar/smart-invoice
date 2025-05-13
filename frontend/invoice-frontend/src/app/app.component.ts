import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InvoiceFormComponent, InvoiceListComponent, InvoiceDetailComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoices: any[] = [];
  selectedInvoice: any = null;

  handleInvoiceCreated(invoice: any) {
    this.invoices.push(invoice);
  }

  handleInvoiceSelected(invoice: any) {
    this.selectedInvoice = invoice;
  }
}
