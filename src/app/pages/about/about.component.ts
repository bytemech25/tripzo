// pages/about/about.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryComponent } from "../../enquiry/enquiry.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, EnquiryComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']

})
export class AboutComponent { 
  @ViewChild('faqSection', { static: true }) faqSection!: ElementRef;
  team = [
    {
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      bio: 'Travel enthusiast with 15+ years in the industry. Visited 67 countries and counting.'
    },
    {
      name: 'Michael Johnson',
      position: 'Co-Founder',
      bio: 'Former airline pilot turned travel expert. Specializes in adventure and cultural tours.'
    },
    {
      name: 'Emma Rodriguez',
      position: 'Head of Operations',
      bio: 'Operations specialist ensuring smooth travel experiences. Fluent in 5 languages.'
    },
    {
      name: 'David Chen',
      position: 'Travel Consultant',
      bio: 'Asia travel specialist with deep knowledge of local cultures and hidden gems.'
    }
  ];


  faqs = [
    {
      id: 1,
      question: 'How far in advance should I book my trip?',
      answer: 'We recommend booking at least 2-3 months in advance for domestic trips and 3-6 months for international travel. This allows for better pricing, availability, and time to handle any necessary documentation like visas.',
      isOpen: false
    },
    {
      id: 2,
      question: 'What is your cancellation policy?',
      answer: 'Our cancellation policy varies by package and destination. Generally, cancellations made 60+ days before departure receive a full refund minus processing fees. Cancellations within 30 days may incur additional penalties.',
      isOpen: false
    },
    {
      id: 3,
      question: 'Do you offer travel insurance?',
      answer: 'Yes, we offer comprehensive travel insurance through our trusted partners. This includes trip cancellation, medical coverage, lost baggage protection, and emergency evacuation services.',
      isOpen: false
    },
    {
      id: 4,
      question: 'Can you help with visa applications?',
      answer: 'Absolutely! We provide full visa assistance services including document review, application submission, and status tracking. Our team stays updated on the latest visa requirements for all destinations.',
      isOpen: false
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and installment payment plans for bookings over $2,000.',
      isOpen: false
    }
  ];

  isVisible = false;
  private intersectionObserver!: IntersectionObserver;

 

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }



  private animateItems() {
    // Trigger staggered animation for FAQ items
    this.faqs.forEach((faq, index) => {
      setTimeout(() => {
        const element = document.getElementById(`faq-item-${faq.id}`);
        if (element) {
          element.classList.add('animate-in');
        }
      }, index * 150); // 150ms delay between each item
    });
  }

 




  constructor() { }

  ngOnInit(): void {
    // Set up intersection observer for animations
    this.setupIntersectionObserver();
  }

  // Method to get gradient class for team member profiles
  getGradientClass(index: number): string {
    const gradients = [
      'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500',
      'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500',
      'bg-gradient-to-br from-green-400 via-teal-500 to-blue-500',
      'bg-gradient-to-br from-orange-400 via-pink-500 to-red-500',
      'bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500',
      'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500'
    ];
    return gradients[index % gradients.length];
  }

  // Method to get FAQ gradient class
  getFAQGradientClass(index: number): string {
    const gradients = [
      'from-purple-400 to-pink-400',
      'from-blue-400 to-purple-400',
      'from-green-400 to-blue-400',
      'from-orange-400 to-pink-400',
      'from-indigo-400 to-purple-400',
      'from-teal-400 to-cyan-400'
    ];
    return gradients[index % gradients.length];
  }

  // Method to get initials from name for profile circles
  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2); // Limit to 2 characters for better display
  }

  // Method to toggle FAQ items
  toggleFAQ(faqId: number): void {
    const faq = this.faqs.find(f => f.id === faqId);
    if (faq) {
      faq.isOpen = !faq.isOpen;
    }
  }

  // Set up intersection observer for scroll animations
  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isVisible = true;
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observe the FAQ section when it's available
      setTimeout(() => {
        if (this.faqSection) {
          observer.observe(this.faqSection.nativeElement);
        }
      }, 100);
    } else {
      // Fallback for environments without IntersectionObserver
      this.isVisible = true;
    }
  }

  // Optional: Method to scroll to FAQ section
  scrollToFAQ(): void {
    if (this.faqSection) {
      this.faqSection.nativeElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Optional: Method to close all FAQs except the selected one
  toggleFAQExclusive(faqId: number): void {
    this.faqs.forEach(faq => {
      if (faq.id === faqId) {
        faq.isOpen = !faq.isOpen;
      } else {
        faq.isOpen = false;
      }
    });
  }

}