import React from 'react'
import Hero from "../components/Layout/Hero"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import ProductGrid from "../components/Products/ProductGrid"

const placeholderProducts = [
  {
    _id: 1,
    name: "Product01",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        allText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: 2,
    name: "Product01",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        allText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: 3,
    name: "Product01",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        allText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: 4,
    name: "Product01",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        allText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: 5,
    name: "Product01",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        allText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: 6,
    name: "Product01",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        allText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: 7,
    name: "Product01",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        allText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: 8,
    name: "Product01",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=9",
        allText: "Stylish Jacket"
      }
    ]
  },
]
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top Wears For Men</h2>
        <ProductGrid products={placeholderProducts} />
      </div>

      
    </div>
  )
}

export default Home
