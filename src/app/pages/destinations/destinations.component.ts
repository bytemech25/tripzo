import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  import { RouterLink } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnquiryComponent } from "../../enquiry/enquiry.component";
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations'; // Optional

interface Destination {
  id: number;
  name: string;
  description: string;
  detailedDescription: string;
  category: string;
  emoji: string;
  image: string;
  gradient: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  bestTime: string;
  highlights: string[];
  isPopular: boolean;
}

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Added FormsModule here
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('staggerCards', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateY(100px)', opacity: 0 }),
          stagger(100, animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })))
        ], { optional: true })
      ])
    ])
  ]
}) 
export class DestinationsComponent {


  searchTerm: string = '';
  sortBy: string = 'name';
  selectedCategory: string = 'All';
  isLoading: boolean = false;
  
  categories: string[] = ['All', 'Hill Stations', 'Beaches', 'Heritage', 'Wildlife', 'Backwaters'];
  
  destinations: Destination[] = [
    {
      id: 1,
      name: 'Munnar',
      description: 'Rolling hills and tea gardens',
      detailedDescription: 'Munnar is a hill station and former resort for the British Raj elite. It is surrounded by rolling hills dotted with tea plantations established in the late 19th century.',
      category: 'Hill Stations',
      emoji: '🏔️',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-green-400 to-blue-500',
      price: 15000,
      rating: 4.8,
      reviews: 2847,
      duration: '3-4 Days',
      bestTime: 'Oct-Mar',
      highlights: ['Tea Gardens', 'Eravikulam National Park', 'Mattupetty Dam', 'Echo Point'],
      isPopular: true
    },
    {
      id: 2,
      name: 'Goa',
      description: 'Sun, sand and beaches',
      detailedDescription: 'Known for its pristine beaches, vibrant nightlife, and Portuguese colonial architecture. Goa offers a perfect blend of relaxation and adventure.',
      category: 'Beaches',
      emoji: '🏖️',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-orange-400 to-pink-500',
      price: 12000,
      rating: 4.6,
      reviews: 5234,
      duration: '4-5 Days',
      bestTime: 'Nov-Feb',
      highlights: ['Baga Beach', 'Old Goa Churches', 'Dudhsagar Falls', 'Spice Plantations'],
      isPopular: true
    },
    {
      id: 3,
      name: 'Hampi',
      description: 'Ancient ruins and heritage',
      detailedDescription: 'A UNESCO World Heritage Site, Hampi was the capital of the Vijayanagara Empire. The site comprises more than 1,600 surviving remains.',
      category: 'Heritage',
      emoji: '🏛️',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-yellow-400 to-orange-500',
      price: 8000,
      rating: 4.7,
      reviews: 1923,
      duration: '2-3 Days',
      bestTime: 'Oct-Mar',
      highlights: ['Virupaksha Temple', 'Hampi Bazaar', 'Lotus Mahal', 'Elephant Stables'],
      isPopular: false
    },
    {
      id: 4,
      name: 'Alleppey',
      description: 'Backwaters and houseboats',
      detailedDescription: 'Known as the "Venice of the East", Alleppey is famous for its serene backwaters, houseboat cruises, and lush paddy fields.',
      category: 'Backwaters',
      emoji: '🚤',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-teal-400 to-blue-500',
      price: 18000,
      rating: 4.5,
      reviews: 3156,
      duration: '2-3 Days',
      bestTime: 'Nov-Mar',
      highlights: ['Houseboat Cruise', 'Vembanad Lake', 'Kumarakom Bird Sanctuary', 'Village Tours'],
      isPopular: true
    },
    {
      id: 5,
      name: 'Bandipur',
      description: 'Wildlife and nature',
      detailedDescription: 'One of India\'s most beautiful national parks, Bandipur is home to tigers, elephants, leopards, and over 200 bird species.',
      category: 'Wildlife',
      emoji: '🐅',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-green-500 to-yellow-500',
      price: 22000,
      rating: 4.4,
      reviews: 876,
      duration: '2-3 Days',
      bestTime: 'Oct-May',
      highlights: ['Tiger Safari', 'Elephant Spotting', 'Bird Watching', 'Nature Walks'],
      isPopular: false
    },
    {
      id: 6,
      name: 'Coorg',
      description: 'Coffee plantations and hills',
      detailedDescription: 'Known as the "Scotland of India", Coorg is famous for its coffee plantations, misty hills, and pleasant weather year-round.',
      category: 'Hill Stations',
      emoji: '🏔️',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-emerald-400 to-teal-500',
      price: 14000,
      rating: 4.6,
      reviews: 2341,
      duration: '3-4 Days',
      bestTime: 'Oct-Mar',
      highlights: ['Coffee Estates', 'Abbey Falls', 'Raja\'s Seat', 'Dubare Elephant Camp'],
      isPopular: false
    }
  ];
  
  filteredDestinations: Destination[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredDestinations = [...this.destinations];
  }

  // Search functionality
  onSearch(): void {
    this.applyFilters();
  }

  // Sort functionality
  sortDestinations(): void {
    switch (this.sortBy) {
      case 'name':
        this.filteredDestinations.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        this.filteredDestinations.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredDestinations.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredDestinations.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        this.filteredDestinations.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.rating - a.rating;
        });
        break;
    }
  }

  // Filter by category
  filterByCategory(category: string): void {
    console.log('Filter clicked:', category); // Debug log
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Handle filter click with event handling
  onFilterClick(event: Event, category: string): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('Filter button clicked:', category);
    this.filterByCategory(category);
  }

  // Apply all filters
  applyFilters(): void {
    console.log('🚀 Applying filters...');
    console.log('🚀 Search term:', this.searchTerm);
    console.log('🚀 Selected category:', this.selectedCategory);
    console.log('🚀 Total destinations:', this.destinations.length);
    
    this.isLoading = true;
    
    setTimeout(() => {
      let filtered = [...this.destinations];
      console.log('🔄 Starting with destinations:', filtered.length);
      
      // Apply category filter
      if (this.selectedCategory !== 'All') {
        filtered = filtered.filter(dest => dest.category === this.selectedCategory);
        console.log('🔄 After category filter:', filtered.length);
      }
      
      // Apply search filter
      if (this.searchTerm.trim()) {
        const searchLower = this.searchTerm.toLowerCase().trim();
        filtered = filtered.filter(dest => 
          dest.name.toLowerCase().includes(searchLower) ||
          dest.description.toLowerCase().includes(searchLower) ||
          dest.detailedDescription.toLowerCase().includes(searchLower) ||
          dest.category.toLowerCase().includes(searchLower) ||
          dest.highlights.some(h => h.toLowerCase().includes(searchLower))
        );
        console.log('🔄 After search filter:', filtered.length);
      }
      
      this.filteredDestinations = filtered;
      console.log('✅ Final filtered destinations:', this.filteredDestinations.length);
      this.sortDestinations();
      this.isLoading = false;
    }, 300);
  }

  // Get filter button classes
  // getFilterButtonClasses(category: string): string {
  //   const baseClasses = 'px-6 py-3 rounded-full transition-all duration-300 font-semibold text-sm cursor-pointer relative overflow-hidden';
    
  //   if (this.selectedCategory === category) {
  //     return `${baseClasses} bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105 hover:from-purple-700 hover:to-pink-700`;
  //   } else {
  //     return `${baseClasses} bg-white text-gray-600 border-2 border-gray-200 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 hover:shadow-md`;
  //   }
  // }

  // Get category color for badges
  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Hill Stations': 'text-green-700 bg-green-100',
      'Beaches': 'text-orange-700 bg-orange-100',
      'Heritage': 'text-yellow-700 bg-yellow-100',
      'Wildlife': 'text-emerald-700 bg-emerald-100',
      'Backwaters': 'text-blue-700 bg-blue-100'
    };
    return colors[category] || 'text-gray-700 bg-gray-100';
  }

  // Get star array for rating display
  getStarArray(rating: number): boolean[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(true);
    }
    
    if (hasHalfStar) {
      stars.push(true);
    }
    
    while (stars.length < 5) {
      stars.push(false);
    }
    
    return stars;
  }

  // Track by function for *ngFor performance
  trackByDestination(index: number, destination: Destination): number {
    return destination.id;
  }

  // Track by function for categories
  trackByCategory(index: number, category: string): string {
    return category;
  }

  // Action methods
  viewDetails(destination: Destination): void {
    console.log('Viewing details for:', destination.name);
    // Implement navigation to details page
    // Example: this.router.navigate(['/destinations', destination.id]);
  }

  bookDestination(destination: Destination): void {
    console.log('Booking destination:', destination.name);
    // Implement booking functionality
    // Example: this.router.navigate(['/booking', destination.id]);
  }

  clearAllFilters(){}

  onSortChange(): void {
    console.log('📊 Sort change triggered:', this.sortBy);
    this.sortDestinations();
  }

  getFilterButtonClasses(category: string): string {
    const base = 'px-5 py-3 rounded-full font-semibold cursor-pointer transform transition-all duration-300 focus:outline-none';
  
    if (this.selectedCategory === category) {
      switch (category) {
        case 'All':
          return `${base} bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 shadow-lg scale-105 ring-2 ring-purple-400`;
        case 'Hill Stations':
          return `${base} bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white shadow-lg scale-105 ring-2 ring-green-300 animate-pulse`;
        case 'Beaches':
          return `${base} bg-gradient-to-r from-blue-400 via-yellow-200 to-pink-400 text-white shadow-lg scale-105 ring-2 ring-blue-300 animate-pulse`;
        case 'Heritage':
          return `${base} bg-gradient-to-r from-yellow-400 via-orange-300 to-red-400 text-white shadow-lg scale-105 ring-2 ring-yellow-300 animate-pulse`;
        case 'Wildlife':
          return `${base} bg-gradient-to-r from-lime-400 via-green-500 to-emerald-400 text-white shadow-lg scale-105 ring-2 ring-lime-300 animate-pulse`;
        case 'Backwaters':
          return `${base} bg-gradient-to-r from-blue-700 via-teal-400 to-green-300 text-white shadow-lg scale-105 ring-2 ring-blue-300 animate-pulse`;
        default:
          return `${base} bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105 ring-2 ring-purple-400`;
      }
    } else {
      return `${base} bg-white text-gray-700 shadow hover:scale-105 hover:shadow-lg transition-all duration-300`;
    }
  }
  
  
  
}