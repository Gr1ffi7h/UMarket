export interface Review {
  id: string
  sellerId: string
  reviewerId: string
  reviewerName: string
  rating: number // 1-5
  comment?: string
  itemId: string
  itemTitle: string
  createdAt: string
}

export interface SellerRating {
  sellerId: string
  sellerName: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
}

class MockReviews {
  private static instance: MockReviews
  private reviews: Review[] = []
  private readonly STORAGE_KEY = 'umarket_reviews'

  static getInstance(): MockReviews {
    if (!MockReviews.instance) {
      MockReviews.instance = new MockReviews()
    }
    return MockReviews.instance
  }

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        try {
          this.reviews = JSON.parse(stored)
        } catch {
          this.reviews = []
        }
      }
    }
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.reviews))
    }
  }

  addReview(
    sellerId: string,
    reviewerId: string,
    reviewerName: string,
    rating: number,
    comment: string | undefined,
    itemId: string,
    itemTitle: string
  ): Review {
    // Check if user already reviewed this seller for this item
    const existingReview = this.reviews.find(
      r => r.sellerId === sellerId && r.reviewerId === reviewerId && r.itemId === itemId
    )
    
    if (existingReview) {
      throw new Error('You have already reviewed this seller for this item')
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      sellerId,
      reviewerId,
      reviewerName,
      rating,
      comment,
      itemId,
      itemTitle,
      createdAt: new Date().toISOString()
    }

    this.reviews.push(review)
    this.saveToStorage()
    return review
  }

  getSellerRating(sellerId: string): SellerRating {
    const sellerReviews = this.reviews.filter(r => r.sellerId === sellerId)
    
    if (sellerReviews.length === 0) {
      return {
        sellerId,
        sellerName: '',
        averageRating: 0,
        totalReviews: 0,
        reviews: []
      }
    }

    const totalRating = sellerReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / sellerReviews.length

    return {
      sellerId,
      sellerName: '',
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: sellerReviews.length,
      reviews: sellerReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }

  getUserReviewsForSeller(sellerId: string, userId: string): Review[] {
    return this.reviews.filter(r => r.sellerId === sellerId && r.reviewerId === userId)
  }

  getAllReviews(): Review[] {
    return [...this.reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  hasUserReviewedSellerForItem(sellerId: string, userId: string, itemId: string): boolean {
    return this.reviews.some(r => 
      r.sellerId === sellerId && r.reviewerId === userId && r.itemId === itemId
    )
  }
}

export const reviews = MockReviews.getInstance()
