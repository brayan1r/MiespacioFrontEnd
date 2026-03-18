import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';
import { BillingService } from '../../../services/billing.service';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './billing.html',
  styleUrl: './billing.scss',
})
export class Billing implements OnInit {
  billings: any[] = [];
  loading = true;

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.loadBillings();
  }

  loadBillings(): void {
    this.billingService.getAllBilling().subscribe({
      next: (res: any) => {
        this.billings = res.billings || res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getFinancialSummary() {
    const total = this.billings.reduce((acc, b) => acc + b.BillValue, 0);
    const pendingCount = this.billings.filter(b => b.isPaid === 'pending').length;
    const pendingTotal = this.billings.filter(b => b.isPaid === 'pending').reduce((acc, b) => acc + b.BillValue, 0);
    const paidThisMonth = this.billings.filter(b => b.isPaid === 'paid').reduce((acc, b) => acc + b.BillValue, 0);

    return { total, pendingCount, pendingTotal, paidThisMonth };
  }
}
