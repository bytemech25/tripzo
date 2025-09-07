
// pages/home/home.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EnquiryComponent } from "../../enquiry/enquiry.component";
import { AfterViewInit, ViewChildren, QueryList } from '@angular/core';
  import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

interface Destination {
  id: number;
  name: string;
  state: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  duration: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, EnquiryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerCards', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('cardHover', [
      state('default', style({ transform: 'translateY(0) scale(1)' })),
      state('hovered', style({ transform: 'translateY(-8px) scale(1.02)' })),
      transition('default <=> hovered', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]

})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('gallerySection', { static: true }) gallerySection!: ElementRef;
  @ViewChild('sliderContainer', { static: true }) sliderContainer!: ElementRef;
  @ViewChildren('fadeItem') fadeItems!: QueryList<ElementRef>;
  hoveredIndex: number | null = null;
  isVisible = false;
  activeFilter = 'all';
  private intersectionObserver!: IntersectionObserver;


  slides = [
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Munnar',
      subtitle: 'The Switzerland of South India',
      description: 'Wander through rolling tea gardens and shola forests at the highest peak of South India, Anamudi.'
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Coorg',
      subtitle: 'Scotland of India',
      description: 'Explore misty coffee plantations, cascading waterfalls, and valleys rich in Kodava culture.'
    },
    {
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Kodaikanal',
      subtitle: 'Princess of Hill Stations',
      description: 'Relax by the star-shaped Kodai Lake, gaze at Pillar Rocks, and wander through pine-clad walks.'
    },
    {
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Wayanad',
      subtitle: 'Land of Spices and Waterfalls',
      description: 'Trek to Chembra Peak and marvel at heart-shaped lakes, spice hills, and ancient caves.'
    },
    {
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Ooty',
      subtitle: 'Queen of Hill Stations',
      description: 'Enjoy colonial charm, cool breezes, and panoramic views from Doddabetta and the Botanical Gardens.'
    },
    {
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Yercaud',
      subtitle: 'The Hidden Jewel',
      description: 'Find tranquility among coffee and orange groves, with vistas of the Shevaroy Hills and emerald lakes.'
    },
    {
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Chikmagalur',
      subtitle: 'Coffee Land of South India',
      description: 'Breathe in the aroma of coffee estates, conquer Mullayanagiri, and discover serene forest trails.'
    },
    {
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Vagamon',
      subtitle: 'Offbeat Meadow Retreat',
      description: 'Escape to rolling meadows, pine forests, and mystical viewpoints far from the crowds.'
    },
    {
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Tadiandamol',
      subtitle: 'Kodagu\'s Highest Peak',
      description: 'Trek through shola-grassland landscapes to reach Kodagu\'s tallest summit at sunrise.'
    },
    {
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Anamudi',
      subtitle: 'Roof of South India',
      description: 'Scale the Western Ghats\' tallest peak in Eravikulam National Park and behold panoramic wilderness.'
    }
  ];
  
  // Alternative with even more specific high-quality images for South Indian destinations:
  
  alternativeSlides = [
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Munnar tea gardens
      title: 'Munnar',
      subtitle: 'The Switzerland of South India',
      description: 'Wander through rolling tea gardens and shola forests at the highest peak of South India, Anamudi.'
    },
    {
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Coffee plantation hills
      title: 'Coorg',
      subtitle: 'Scotland of India',
      description: 'Explore misty coffee plantations, cascading waterfalls, and valleys rich in Kodava culture.'
    },
    {
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Hill station lake view
      title: 'Kodaikanal',
      subtitle: 'Princess of Hill Stations',
      description: 'Relax by the star-shaped Kodai Lake, gaze at Pillar Rocks, and wander through pine-clad walks.'
    },
    {
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Misty mountains
      title: 'Wayanad',
      subtitle: 'Land of Spices and Waterfalls',
      description: 'Trek to Chembra Peak and marvel at heart-shaped lakes, spice hills, and ancient caves.'
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Colonial architecture with hills
      title: 'Ooty',
      subtitle: 'Queen of Hill Stations',
      description: 'Enjoy colonial charm, cool breezes, and panoramic views from Doddabetta and the Botanical Gardens.'
    },
    {
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Serene backwaters representing tranquility
      title: 'Yercaud',
      subtitle: 'The Hidden Jewel',
      description: 'Find tranquility among coffee and orange groves, with vistas of the Shevaroy Hills and emerald lakes.'
    },
    {
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Temple architecture representing South India
      title: 'Chikmagalur',
      subtitle: 'Coffee Land of South India',
      description: 'Breathe in the aroma of coffee estates, conquer Mullayanagiri, and discover serene forest trails.'
    },
    {
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Lush green landscapes
      title: 'Vagamon',
      subtitle: 'Offbeat Meadow Retreat',
      description: 'Escape to rolling meadows, pine forests, and mystical viewpoints far from the crowds.'
    },
    {
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Mountain peak sunrise
      title: 'Tadiandamol',
      subtitle: 'Kodagu\'s Highest Peak',
      description: 'Trek through shola-grassland landscapes to reach Kodagu\'s tallest summit at sunrise.'
    },
    {
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Highest peak landscape
      title: 'Anamudi',
      subtitle: 'Roof of South India',
      description: 'Scale the Western Ghats\' tallest peak in Eravikulam National Park and behold panoramic wilderness.'
    }
  ];
  

  galleryItems = [
    {
      id: 1,
      title: 'Santorini',
      subtitle: 'Greek Paradise',
      description: 'Experience the breathtaking sunsets and white-washed buildings of this iconic Greek island.',
      imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'europe',
      rating: '⭐⭐⭐⭐⭐',
      ratingText: '4.9/5 (2,847 reviews)',
      price: 'From $1,299',
      features: [
        { icon: '🏖️', text: 'Beautiful Beaches' },
        { icon: '🌅', text: 'Amazing Sunsets' },
        { icon: '🏛️', text: 'Rich History' }
      ]
    },
    {
      id: 2,
      title: 'Tokyo',
      subtitle: 'Modern Metropolis',
      description: 'Discover the perfect blend of traditional culture and futuristic innovation in Japan\'s capital.',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'asia',
      rating: '⭐⭐⭐⭐⭐',
      ratingText: '4.8/5 (3,521 reviews)',
      price: 'From $1,899',
      features: [
        { icon: '🏮', text: 'Cultural Heritage' },
        { icon: '🍣', text: 'Amazing Cuisine' },
        { icon: '🌸', text: 'Cherry Blossoms' }
      ]
    },
    {
      id: 3,
      title: 'Bali',
      subtitle: 'Island of Gods',
      description: 'Immerse yourself in the spiritual beauty and tropical paradise of Indonesia\'s most famous island.',
      imageUrl: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'asia',
      rating: '⭐⭐⭐⭐⭐',
      ratingText: '4.7/5 (4,103 reviews)',
      price: 'From $899',
      features: [
        { icon: '🏄‍♀️', text: 'Water Sports' },
        { icon: '🛕', text: 'Ancient Temples' },
        { icon: '🌺', text: 'Tropical Beauty' }
      ]
    },
    {
      id: 4,
      title: 'Patagonia',
      subtitle: 'Wild Frontier',
      description: 'Explore the untamed wilderness and dramatic landscapes at the southern tip of South America.',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'americas',
      rating: '⭐⭐⭐⭐⭐',
      ratingText: '4.9/5 (1,876 reviews)',
      price: 'From $2,199',
      features: [
        { icon: '🏔️', text: 'Mountain Peaks' },
        { icon: '🦎', text: 'Wildlife' },
        { icon: '🥾', text: 'Adventure Tours' }
      ]
    },
    {
      id: 5,
      title: 'Maldives',
      subtitle: 'Tropical Paradise',
      description: 'Escape to crystal-clear waters and overwater bungalows in this luxury island destination.',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'asia',
      rating: '⭐⭐⭐⭐⭐',
      ratingText: '4.8/5 (2,234 reviews)',
      price: 'From $3,499',
      features: [
        { icon: '🏖️', text: 'Private Beaches' },
        { icon: '🐠', text: 'Diving & Snorkeling' },
        { icon: '💆‍♀️', text: 'Luxury Spas' }
      ]
    },
    {
      id: 6,
      title: 'Iceland',
      subtitle: 'Land of Fire & Ice',
      description: 'Witness the raw power of nature with glaciers, volcanoes, and the magical Northern Lights.',
      imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'europe',
      rating: '⭐⭐⭐⭐⭐',
      ratingText: '4.9/5 (3,012 reviews)',
      price: 'From $1,799',
      features: [
        { icon: '❄️', text: 'Glaciers' },
        { icon: '🌋', text: 'Volcanoes' },
        { icon: '💚', text: 'Northern Lights' }
      ]
    }
  ];

  popularDestinationsGrid: Destination[] = [
    {
      id: 1,
      name: 'Munnar',
      state: 'Kerala',
      description: 'Experience the misty hills and endless tea plantations of Kerala\'s hill station paradise',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Hill Station',
      rating: 4.8,
      duration: '3-4 Days'
    },
    {
      id: 2,
      name: 'Alleppey',
      state: 'Kerala',
      description: 'Cruise through tranquil backwaters on traditional houseboats in God\'s Own Country',
      price: 15499,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Backwaters',
      rating: 4.9,
      duration: '2-3 Days'
    },
    {
      id: 3,
      name: 'Ooty',
      state: 'Tamil Nadu',
      description: 'The Queen of Hills with beautiful gardens, lakes, and the famous Nilgiri Mountain Railway',
      price: 11799,
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Hill Station',
      rating: 4.7,
      duration: '3-4 Days'
    },
    {
      id: 4,
      name: 'Kochi',
      state: 'Kerala',
      description: 'Historic port city blending colonial architecture with modern culture and spice markets',
      price: 9999,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Cultural',
      rating: 4.6,
      duration: '2-3 Days'
    },
    {
      id: 5,
      name: 'Madurai',
      state: 'Tamil Nadu',
      description: 'Ancient temple city famous for the magnificent Meenakshi Amman Temple',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Heritage',
      rating: 4.5,
      duration: '2-3 Days'
    },
    {
      id: 6,
      name: 'Kumarakom',
      state: 'Kerala',
      description: 'Serene backwater destination perfect for bird watching and luxury houseboat stays',
      price: 13999,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Nature',
      rating: 4.7,
      duration: '2-3 Days'
    }
  ];


  currentIndex = 0;
  isAnimating = false;
  autoSlideInterval: any;
  touchStartX = 0;
  touchEndX = 0;

  filters = [
    { key: 'all', label: 'All Places', icon: '🌎' },
    { key: 'kerala', label: 'Kerala', icon: '🌴' },
    { key: 'tamilnadu', label: 'Tamil Nadu', icon: '🏛️' },
    { key: 'backwaters', label: 'Backwaters', icon: '🛶' },
    { key: 'hills', label: 'Hill Stations', icon: '⛰️' },
    { key: 'beaches', label: 'Beaches', icon: '🏖️' },
    { key: 'temples', label: 'Temples', icon: '🛕' }
  ];

  destinations = [
    {
      id: 1,
      title: 'Alleppey',
      subtitle: 'Venice of the East',
      category: 'backwaters',
      state: 'kerala',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80',
      description: 'Experience the serene backwaters of Alleppey on traditional houseboats surrounded by lush greenery and coconut palms.',
      price: '₹2,500',
      rating: '4.8',
      reviewCount: '1,240',
      features: [
        { icon: '🛶', text: 'Houseboat Stay' },
        { icon: '🌾', text: 'Rice Paddies' },
        { icon: '🐟', text: 'Fresh Seafood' },
        { icon: '🌅', text: 'Sunset Views' }
      ]
    },
    {
      id: 2,
      title: 'Munnar',
      subtitle: 'Tea Garden Paradise',
      category: 'hills',
      state: 'kerala',
      imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=640&q=80',
      description: 'Rolling hills covered in emerald tea plantations with cool mountain air and breathtaking panoramic views.',
      price: '₹3,200',
      rating: '4.9',
      reviewCount: '2,100',
      features: [
        { icon: '🍃', text: 'Tea Plantations' },
        { icon: '🦋', text: 'Wildlife Sanctuary' },
        { icon: '❄️', text: 'Cool Climate' },
        { icon: '📸', text: 'Photo Spots' }
      ]
    },
    {
      id: 3,
      title: 'Ooty',
      subtitle: 'Queen of Hill Stations',
      category: 'hills',
      state: 'tamilnadu',
      imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=640&q=80',
      description: 'Colonial charm meets natural beauty in this picturesque hill station famous for its toy train rides.',
      price: '₹2,800',
      rating: '4.7',
      reviewCount: '1,890',
      features: [
        { icon: '🚂', text: 'Toy Train' },
        { icon: '🌸', text: 'Botanical Garden' },
        { icon: '🏔️', text: 'Valley Views' },
        { icon: '☁️', text: 'Misty Weather' }
      ]
    },
    {
      id: 4,
      title: 'Kochi',
      subtitle: 'Queen of Arabian Sea',
      category: 'beaches',
      state: 'kerala',
      imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=640&q=80',
      description: 'Historic port city blending colonial architecture with modern attractions, spice markets, and Chinese fishing nets.',
      price: '₹2,000',
      rating: '4.6',
      reviewCount: '1,650',
      features: [
        { icon: '🏛️', text: 'Colonial Architecture' },
        { icon: '🎭', text: 'Kathakali Shows' },
        { icon: '🌶️', text: 'Spice Markets' },
        { icon: '🎣', text: 'Chinese Nets' }
      ]
    },
    {
      id: 5,
      title: 'Rameswaram',
      subtitle: 'Sacred Island Temple',
      category: 'temples',
      state: 'tamilnadu',
      imageUrl: 'https://images.unsplash.com/photo-1544531584-2b1b08e67b9a?auto=format&fit=crop&w=640&q=80',
      description: 'Sacred pilgrimage site with magnificent temple architecture surrounded by pristine beaches and coral reefs.',
      price: '₹1,800',
      rating: '4.5',
      reviewCount: '980',
      features: [
        { icon: '🛕', text: 'Sacred Temple' },
        { icon: '🏖️', text: 'Pristine Beaches' },
        { icon: '🐠', text: 'Marine Life' },
        { icon: '🙏', text: 'Pilgrimage Site' }
      ]
    },
    {
      id: 6,
      title: 'Kodaikanal',
      subtitle: 'Princess of Hill Stations',
      category: 'hills',
      state: 'tamilnadu',
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=640&q=80',
      description: 'Misty mountains, pine forests, and serene lakes make this hill station a perfect romantic getaway.',
      price: '₹2,600',
      rating: '4.8',
      reviewCount: '1,520',
      features: [
        { icon: '🌲', text: 'Pine Forests' },
        { icon: '🏞️', text: 'Lake Boating' },
        { icon: '🌙', text: 'Romantic Views' },
        { icon: '🥾', text: 'Nature Trails' }
      ]
    },
    {
      id: 7,
      title: 'Varkala',
      subtitle: 'Cliff Beach Paradise',
      category: 'beaches',
      state: 'kerala',
      imageUrl: 'https://images.unsplash.com/photo-1519821172143-2b6a154fa8a6?auto=format&fit=crop&w=640&q=80',
      description: 'Dramatic red cliffs overlooking golden beaches with natural springs and Ayurvedic treatments.',
      price: '₹2,200',
      rating: '4.7',
      reviewCount: '1,380',
      features: [
        { icon: '🏔️', text: 'Red Cliffs' },
        { icon: '💆', text: 'Ayurveda Spa' },
        { icon: '⛲', text: 'Natural Springs' },
        { icon: '🌊', text: 'Surfing Spots' }
      ]
    },
    {
      id: 8,
      title: 'Madurai',
      subtitle: 'Temple City of South',
      category: 'temples',
      state: 'tamilnadu',
      imageUrl: 'https://images.unsplash.com/photo-1523528283112-eb88c1fb91c5?auto=format&fit=crop&w=640&q=80',
      description: 'Ancient city famous for the magnificent Meenakshi Temple with intricate architecture and vibrant culture.',
      price: '₹1,500',
      rating: '4.6',
      reviewCount: '2,200',
      features: [
        { icon: '🛕', text: 'Meenakshi Temple' },
        { icon: '🎨', text: 'Temple Art' },
        { icon: '🛍️', text: 'Local Markets' },
        { icon: '🍛', text: 'South Indian Food' }
      ]
    }
  ];
  

  cardStates: { [key: number]: string } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
    this.popularDestinationsGrid.forEach(dest => {
      this.cardStates[dest.id] = 'default';
    });

    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    if (isPlatformBrowser(this.platformId) && this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target); // only play once
            }
          });
        },
        { threshold: 0.2 }
      );

      this.fadeItems.forEach(item => observer.observe(item.nativeElement));
    }
  }

  onCardHover(destinationId: number, isHovered: boolean): void {
    this.cardStates[destinationId] = isHovered ? 'hovered' : 'default';
  }


  navigateToTours(destination: Destination): void {
    // Implement navigation logic here
    console.log('Navigate to tours for:', destination.name);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  trackByDestinationId(index: number, destination: Destination): number {
    return destination.id;
  }


  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 6000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    setTimeout(() => this.startAutoSlide(), 3000);
  }

  next() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.animateSlide(nextIndex, 'next');
  }

  previous() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const prevIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    this.animateSlide(prevIndex, 'prev');
  }

  goToSlide(index: number) {
    if (this.isAnimating || index === this.currentIndex) return;
    
    this.isAnimating = true;
    const direction = index > this.currentIndex ? 'next' : 'prev';
    this.animateSlide(index, direction);
  }

  private animateSlide(newIndex: number, direction: string) {
    this.currentIndex = newIndex;
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 1000);

    this.restartAutoSlide();
  }

  private setupTouchEvents() {
    const container = this.sliderContainer.nativeElement;
    
    container.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.stopAutoSlide();
    });

    container.addEventListener('touchend', (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
  }

  private handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.previous();
      }
    } else {
      this.restartAutoSlide();
    }
  }

  onMouseEnter() {
    this.stopAutoSlide();
  }

  onMouseLeave() {
    this.restartAutoSlide();
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible = true;
      setTimeout(() => this.animateItems(), 100);
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.animateItems();
        }
      });
    }, options);

    if (this.gallerySection?.nativeElement) {
      this.intersectionObserver.observe(this.gallerySection.nativeElement);
    }
  }

  private animateItems() {
    this.filteredItems.forEach((item, index) => {
      setTimeout(() => {
        const element = document.getElementById(`gallery-item-${item.id}`);
        if (element) {
          element.classList.add('animate-in');
        }
      }, index * 200);
    });
  }

  get filteredItems() {
    if (this.activeFilter === 'all') {
      return this.destinations;
    }
    return this.destinations.filter(item => 
      item.category === this.activeFilter || item.state === this.activeFilter
    );
  }

  onHover(index: number) {
    this.hoveredIndex = index;
    this.hoveredIndex = index;
    // Force reflow for better hover detection
    setTimeout(() => {
      const element = document.getElementById(`gallery-item-${this.filteredItems[index].id}`);
      if (element) {
        element.style.zIndex = '20';
      }
    }, 0);
  }

  onLeave(index: number) {
    this.hoveredIndex = null;
    this.hoveredIndex = -1;
    const element = document.getElementById(`gallery-item-${this.filteredItems[index].id}`);
    if (element) {
      element.style.zIndex = '10';
    }
  }

  getGridClass(index: number): string {
    const classes = ['gallery-item'];
    
    // Create dynamic masonry-like layout
    if (index % 6 === 0 || index % 6 === 3) {
      classes.push('large-item');
    } else if (index % 6 === 1 || index % 6 === 4) {
      classes.push('medium-item');
    } else {
      classes.push('small-item');
    }
    
    return classes.join(' ');
  }

  getFilterIcon(category: string): string {
    const icons = {
      backwaters: '🛶',
      hills: '⛰️',
      beaches: '🏖️',
      temples: '🛕'
    } as const;
  
    return (icons as Record<string, string>)[category] || '📍';
  }
  

  setFilter(filter: string) {
      this.activeFilter = filter;
      this.isVisible = false;
      
    setTimeout(() => {
      this.isVisible = true;
      this.animateItems();
    }, 300);
  }

  onExplore(item: any) {
    console.log('Exploring:', item.title);
    // Handle exploration logic
  }
  sliderImages = [
    '../../../assets/taj.png',
    '../../../assets/india_gate.png',
    '../../../assets/indian-city-building.png',
  ];

intervalId: any;


startSlider() {
    this.intervalId = setInterval(() => {
     this.next();
    }, 3000);
  }
  stopSlider() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }



  popularDestinations = [
    {
      name: 'Ooty, India',
      description: 'The City of Light awaits with its romantic charm and iconic landmarks.',
      price: 1299
    },
    {
      name: 'Goa, India',
      description: 'Experience the perfect blend of tradition and modernity in Japan\'s capital.',
      price: 1899
    },
    {
      name: 'Kerala India',
      description: 'Tropical paradise with stunning beaches and rich cultural heritage.',
      price: 899
    },
       {
      name: 'Darjeeling India',
      description: 'Tropical paradise with stunning beaches and rich cultural heritage.',
      price: 899
    },
           {
      name: 'Golden Temple India',
      description: 'Tropical paradise with stunning beaches and rich cultural heritage.',
      price: 899
    },
           {
      name: 'Ladakh India',
      description: 'Tropical paradise with stunning beaches and rich cultural heritage.',
      price: 899
    }
  ];




  testimonials = [
    {
      name: 'John Doe',
      role: 'Travel Blogger',
      comment: 'Breathtaking adventure! Can’t wait for my next trip. From the moment I landed, every single detail was thoughtfully organized. Stunning landscapes, warm locals, and unforgettable cultural moments made this experience one of the best in my life. I even made new friends I’ll cherish forever, and the nighttime campfires under the stars were magical beyond words.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      expanded: false,
      colorClass: 'bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 hover:from-pink-300 hover:via-red-300 hover:to-yellow-300'
    },
    {
      name: 'Sarah Lee',
      role: 'Photographer',
      comment: 'Incredible landscapes and unforgettable experiences. From challenging hikes across mountain ridges to relaxing boat rides in turquoise waters, this trip delivered the perfect mix of thrill and serenity. The guides were friendly and passionate, making every activity fun. I pushed my limits and found new perspectives on travel and life.',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      expanded: false,
      colorClass: 'bg-gradient-to-r from-blue-200 via-sky-200 to-green-200 hover:from-blue-300 hover:via-sky-300 hover:to-green-300'
    },
    {
      name: 'Michael Smith',
      role: 'Explorer',
      comment: 'Felt like a dream – every detail was taken care of. Beautiful accommodations, gourmet local cuisine, and a perfectly balanced schedule of adventure and relaxation made this journey unforgettable. I came back not only refreshed but creatively inspired by the colors, textures, and patterns I saw during the trip.',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      expanded: false,
      colorClass: 'bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 hover:from-purple-300 hover:via-pink-300 hover:to-orange-300'
    },
    {
      name: 'Emily Brown',
      role: 'Designer',
      comment: 'Felt like a dream... during the trip.',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      expanded: false,
      colorClass: 'bg-gradient-to-r from-amber-200 via-orange-200 to-pink-200 hover:from-amber-300 hover:via-orange-300 hover:to-pink-300'
    },
    {
      name: 'David Wilson',
      role: 'Adventure Guide',
      comment: 'Thrilling, safe... beauty of nature around us.',
      image: 'https://randomuser.me/api/portraits/men/5.jpg',
      expanded: false,
      colorClass: 'bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 hover:from-green-300 hover:via-teal-300 hover:to-blue-300'
    },
    {
      name: 'Olivia White',
      role: 'Writer',
      comment: 'The memories I’ve made... remember every detail.',
      image: 'https://randomuser.me/api/portraits/women/6.jpg',
      expanded: false,
      colorClass: 'bg-gradient-to-r from-fuchsia-200 via-purple-200 to-indigo-200 hover:from-fuchsia-300 hover:via-purple-300 hover:to-indigo-300'
    }
  ];

  getCardClasses(index: number) {
    const layouts = [
      'sm:col-span-6 sm:row-span-2',
      'sm:col-span-6 sm:row-span-1',
      'sm:col-span-6 sm:row-span-1',
      'sm:col-span-4 sm:row-span-1',
      'sm:col-span-4 sm:row-span-1',
      'sm:col-span-4 sm:row-span-1'
    ];
    return layouts[index % layouts.length];
  }

}

