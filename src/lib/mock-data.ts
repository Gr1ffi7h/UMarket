export interface MockItem {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  seller: {
    id: string
    name: string
    school: string
  }
  category: string
  condition: string
  location: string
  createdAt?: string
  isSponsored?: boolean
}

export const mockItems: MockItem[] = [
  {
    id: "calculus-textbook",
    title: "Calculus Textbook",
    description: "Essential calculus textbook for STEM majors. Like new condition.",
    price: 45,
    images: ["/placeholder-book.jpg"],
    seller: {
      id: "1",
      name: "Alex C.",
      school: "Stanford University"
    },
    category: "Textbooks",
    condition: "Like New",
    location: "Stanford, CA",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "macbook-pro-2020",
    title: "MacBook Pro 2020",
    description: "13-inch MacBook Pro, 16GB RAM, 512GB SSD. Great for coding.",
    price: 850,
    images: ["/placeholder-laptop.jpg"],
    seller: {
      id: "2", 
      name: "Sarah J.",
      school: "MIT"
    },
    category: "Electronics",
    condition: "Good",
    location: "Cambridge, MA",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "desk-lamp",
    title: "Dorm Room Desk Lamp",
    description: "LED desk lamp with adjustable brightness. Perfect for studying.",
    price: 25,
    images: ["/placeholder-lamp.jpg"],
    seller: {
      id: "3",
      name: "Mike D.",
      school: "UCLA"
    },
    category: "Furniture",
    condition: "Good",
    location: "Los Angeles, CA",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "chemistry-lab-kit",
    title: "Chemistry Lab Kit",
    description: "Complete chemistry lab set with beakers, test tubes, and safety gear.",
    price: 35,
    images: ["/placeholder-lab.jpg"],
    seller: {
      id: "4",
      name: "Emily W.",
      school: "Harvard"
    },
    category: "Supplies",
    condition: "Like New",
    location: "Cambridge, MA",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "mountain-bike",
    title: "Mountain Bike",
    description: "21-speed mountain bike, recently serviced. Great for campus commute.",
    price: 120,
    images: ["/placeholder-bike.jpg"],
    seller: {
      id: "5",
      name: "James B.",
      school: "UC Berkeley"
    },
    category: "Sports",
    condition: "Good",
    location: "Berkeley, CA",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "wireless-headphones",
    title: "Wireless Headphones",
    description: "Noise-cancelling Bluetooth headphones, perfect for studying in noisy dorms.",
    price: 65,
    images: ["/placeholder-headphones.jpg"],
    seller: {
      id: "7",
      name: "David K.",
      school: "Stanford"
    },
    category: "Electronics",
    condition: "Like New",
    location: "Stanford, CA",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "organic-chemistry-textbook",
    title: "Organic Chemistry Textbook",
    description: "Advanced organic chemistry textbook with detailed explanations and practice problems.",
    price: 89,
    images: ["/placeholder-chem.jpg"],
    seller: {
      id: "8",
      name: "Jennifer L.",
      school: "MIT"
    },
    category: "Textbooks",
    condition: "Good",
    location: "Cambridge, MA",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
]

export const sponsoredItem: MockItem = {
  id: "premium-study-desk",
  title: "Premium Study Desk",
  description: "Ergonomic study desk with built-in LED lighting and cable management. Perfect for long study sessions.",
  price: 299,
  images: ["/placeholder-desk.jpg"],
  seller: {
    id: "sponsored-seller",
    name: "Campus Furniture Co.",
    school: "Multiple Campuses"
  },
  category: "Furniture",
  condition: "New",
  location: "Nationwide Shipping",
  isSponsored: true
}

export function getItemById(id: string): MockItem | undefined {
  return mockItems.find(item => item.id === id)
}
