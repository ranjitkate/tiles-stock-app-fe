import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService, Vendor } from '../service/vendor.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  vendorForm!: FormGroup;
  vendors: Vendor[] = [];
  editingVendorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService
  ) { }

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      gstNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadVendors();
  }

  loadVendors() {
    this.vendorService.getVendors().subscribe(data => {
      this.vendors = data;
    });
  }

  onSubmit() {
    if (this.vendorForm.invalid) return;

    if (this.editingVendorId) {
      // Update
      this.vendorService.updateVendor(this.editingVendorId, this.vendorForm.value)
        .subscribe(() => {
          this.loadVendors();
          this.vendorForm.reset();
          this.editingVendorId = null;
        });
    } else {
      // Add
      this.vendorService.addVendor(this.vendorForm.value)
        .subscribe(() => {
          this.loadVendors();
          this.vendorForm.reset();
        });
    }
  }

  editVendor(vendor: Vendor) {
    this.vendorForm.patchValue(vendor);
    this.editingVendorId = vendor.id || null;
  }

  deleteVendor(id: number) {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.vendorService.deleteVendor(id).subscribe(() => {
        this.loadVendors();
      });
    }
  }
}
