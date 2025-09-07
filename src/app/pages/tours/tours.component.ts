import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookNowDialogComponent } from '../book-now-dialog/book-now-dialog.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { CalendarWrapperComponent } from "../../calendar-wrapper/calendar-wrapper.component";
import { EnquiryComponent } from "../../enquiry/enquiry.component";

interface Tour {
  name: string;
  duration: string;
  description: string;
  includes: string[];
  imageUrl?: string;
  rating?: string;
  price?: string;
  groupSize?: string;
}
@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],

})
export class ToursComponent {





  
  tours: Tour[] = [
    {
      name: "Temple Trail Tamil Nadu",
      duration: "7 Days",
      description: "Explore the magnificent Dravidian architecture and spiritual heritage of Tamil Nadu's ancient temples including Meenakshi Temple, Brihadeeswarar Temple, and more.",
      includes: [
        "Madurai Meenakshi Temple visit",
        "Thanjavur Brihadeeswarar Temple",
        "Traditional South Indian meals",
        "Expert local guides",
        "Cultural performances",
        "Heritage accommodation"
      ],
      imageUrl: "assets/images/meenakshi-temple.jpg", // Add your actual image path
      rating: "4.9",
      price: "28,500",
      groupSize: "15"
    },
    {
      name: "Kerala Backwaters & Spices",
      duration: "5 Days",
      description: "Navigate through Kerala's tranquil backwaters in traditional houseboats and explore aromatic spice plantations in the Western Ghats.",
      includes: [
        "Houseboat stay in Alleppey",
        "Spice plantation tour in Munnar",
        "Ayurvedic spa treatments",
        "Traditional Kerala cuisine",
        "Tea garden visits",
        "Kathakali performance"
      ],
      imageUrl: "assets/images/kerala-backwaters.jpg",
      rating: "4.8",
      price: "32,000",
      groupSize: "12"
    },
    {
      name: "Karnataka Heritage Circuit",
      duration: "6 Days",
      description: "Discover the royal legacy of Mysore Palace, ancient ruins of Hampi, and the architectural marvels of Karnataka's golden era.",
      includes: [
        "Mysore Palace guided tour",
        "Hampi UNESCO World Heritage site",
        "Belur Halebid temple complex",
        "Traditional silk weaving demonstration",
        "Royal dining experiences",
        "Heritage hotel stays"
      ],
      imageUrl: "assets/images/mysore-palace.jpg",
      rating: "4.7",
      price: "26,800",
      groupSize: "18"
    },
    {
      name: "Andhra Coastal Delights",
      duration: "4 Days",
      description: "Experience the vibrant coastal culture of Andhra Pradesh with pristine beaches, ancient Buddhist sites, and delectable Andhra cuisine.",
      includes: [
        "Visakhapatnam beach resorts",
        "Amaravati Buddhist heritage site",
        "Authentic Andhra meals",
        "Coastal fishing village visits",
        "Traditional handicraft workshops",
        "Sunset boat cruises"
      ],
      imageUrl: "assets/images/visakhapatnam-beach.jpg",
      rating: "4.6",
      price: "22,500",
      groupSize: "20"
    }
  ];

  // Default placeholder images for different tour types
  private defaultImages = [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop&crop=center', // Temple architecture
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop&crop=center', // Kerala backwaters
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center', // Palace architecture
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&h=300&fit=crop&crop=center'  // Coastal scenes
  ];

  /**
   * Returns a default image URL based on the tour index
   * @param index - The index of the tour in the array
   * @returns Default image URL
   */
  getDefaultImage(index: number): string {
    return this.defaultImages[index % this.defaultImages.length];
  }

  /**
   * Handles image loading errors by setting a fallback image
   * @param event - The error event
   * @param index - The index of the tour
   */
  onImageError(event: any, index: number): void {
    console.warn(`Failed to load image for tour ${index}, using fallback`);
    event.target.src = this.getDefaultImage(index);
  }

  /**
   * Handle tour booking
   * @param tour - The selected tour
   */
  onBookTour(tour: Tour): void {
    console.log('Booking tour:', tour.name);
    // Implement booking logic here
    // You might want to navigate to a booking page or open a modal
  }

  /**
   * Handle view tour details
   * @param tour - The selected tour
   */
  onViewDetails(tour: Tour): void {
    console.log('Viewing details for:', tour.name);
    // Implement details view logic here
    // You might want to navigate to a details page or expand the card
  }

  /**
   * Get tour image with error handling
   * @param tour - The tour object
   * @param index - The tour index
   * @returns Image URL or default image
   */
  getTourImage(tour: Tour, index: number): string {
    return tour.imageUrl || this.getDefaultImage(index);
  }
}
