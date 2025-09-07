import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TravelService } from '../travel.service';
import { DashboardComponent } from "../../dashboard/dashboard.component";

interface IndividualFormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
}

interface GroupFormData {
  organizationName: string;
  contactPerson: string;
  email: string;
  groupSize: string;
  travelType: string;
  travelDates: string;
  budgetRange: string;
  details: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  activeTab: 'individual' | 'group' = 'individual';
  
  // Individual form data
  formData: IndividualFormData = {
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  };
  
  // Group form data
  groupFormData: GroupFormData = {
    organizationName: '',
    contactPerson: '',
    email: '',
    groupSize: '',
    travelType: '',
    travelDates: '',
    budgetRange: '',
    details: ''
  };

  /**
   * Switch between individual and group travel tabs
   * @param tab - The tab to switch to
   */
  switchTab(tab: 'individual' | 'group'): void {
    this.activeTab = tab;
    
    // Add smooth transition effect
    const content = document.querySelector('.tab-content');
    if (content) {
      content.classList.remove('animate-slide-in');
      setTimeout(() => {
        content.classList.add('animate-slide-in');
      }, 50);
    }
  }

  /**
   * Handle individual travel form submission
   */
  onSubmit(): void {
    if (this.isIndividualFormValid()) {
      console.log('Individual Form Data:', this.formData);
      
      // Show success message
      this.showSuccessMessage('individual');
      
      // Here you would typically send data to your backend service
      // this.contactService.submitIndividualInquiry(this.formData).subscribe(...)
      
      // Reset form after successful submission
      this.resetIndividualForm();
    } else {
      this.showErrorMessage('Please fill in all required fields.');
    }
  }

  /**
   * Handle group travel form submission
   */
  onGroupSubmit(): void {
    if (this.isGroupFormValid()) {
      console.log('Group Form Data:', this.groupFormData);
      
      // Show success message
      this.showSuccessMessage('group');
      
      // Here you would typically send data to your backend service
      // this.contactService.submitGroupInquiry(this.groupFormData).subscribe(...)
      
      // Reset form after successful submission
      this.resetGroupForm();
    } else {
      this.showErrorMessage('Please fill in all required fields.');
    }
  }

  /**
   * Validate individual form
   * @returns boolean indicating if form is valid
   */
  private isIndividualFormValid(): boolean {
    return !!(
      this.formData.name.trim() &&
      this.formData.email.trim() &&
      this.isValidEmail(this.formData.email) &&
      this.formData.message.trim()
    );
  }

  /**
   * Validate group form
   * @returns boolean indicating if form is valid
   */
  private isGroupFormValid(): boolean {
    return !!(
      this.groupFormData.organizationName.trim() &&
      this.groupFormData.contactPerson.trim() &&
      this.groupFormData.email.trim() &&
      this.isValidEmail(this.groupFormData.email) &&
      this.groupFormData.groupSize &&
      this.groupFormData.travelType
    );
  }

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns boolean indicating if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /**
   * Reset individual form to initial state
   */
  private resetIndividualForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      destination: '',
      message: ''
    };
  }

  /**
   * Reset group form to initial state
   */
  private resetGroupForm(): void {
    this.groupFormData = {
      organizationName: '',
      contactPerson: '',
      email: '',
      groupSize: '',
      travelType: '',
      travelDates: '',
      budgetRange: '',
      details: ''
    };
  }

  /**
   * Show success message to user
   * @param formType - Type of form that was submitted
   */
  private showSuccessMessage(formType: 'individual' | 'group'): void {
    const message = formType === 'individual' 
      ? 'Thank you! Your travel inquiry has been submitted. We\'ll contact you within 24 hours to discuss your dream trip!'
      : 'Thank you! Your group travel request has been submitted. Our team will prepare a custom quote and contact you within 24 hours.';
    
    // You can implement a toast notification system here
    alert(message);
    
    // Or use a proper notification service
    // this.notificationService.showSuccess(message);
  }

  /**
   * Show error message to user
   * @param message - Error message to display
   */
  private showErrorMessage(message: string): void {
    // You can implement a toast notification system here
    alert(message);
    
    // Or use a proper notification service
    // this.notificationService.showError(message);
  }

  /**
   * Handle phone number formatting (optional)
   * @param event - Input event
   */
  onPhoneInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX for US numbers
    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    event.target.value = value;
    
    // Update the form data
    if (this.activeTab === 'individual') {
      this.formData.phone = value;
    }
  }

  /**
   * Get formatted destination display name
   * @param destination - Destination code
   * @returns Formatted destination name
   */
  getDestinationDisplayName(destination: string): string {
    const destinations: { [key: string]: string } = {
      'south-india': '🏛️ South India Heritage',
      'kerala': '🌴 Kerala Backwaters',
      'rajasthan': '🏰 Rajasthan Royalty',
      'himalayas': '🏔️ Himalayan Peaks',
      'goa': '🏖️ Goa Beaches',
      'europe': '🇪🇺 European Classics',
      'asia': '🌏 Asian Adventures',
      'custom': '🎯 Custom Journey'
    };
    
    return destinations[destination] || destination;
  }

  /**
   * Handle file upload for group travel (if needed)
   * @param event - File input event
   */
  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
      // Handle file upload logic here
      // this.fileUploadService.upload(file).subscribe(...)
    }
  }

  /**
   * Open location in Google Maps
   */
  openLocationInMaps(): void {
    const address = '123 Adventure Street, Travel City, Dream State, India 12345';
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  }

  /**
   * Initiate phone call
   */
  callUs(): void {
    window.location.href = 'tel:+919876543210';
  }

  /**
   * Open email client
   */
  emailUs(): void {
    window.location.href = 'mailto:hello@dreamtravel.com?subject=Travel Inquiry';
  }

  /**
   * Get current year for copyright (if needed elsewhere)
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}