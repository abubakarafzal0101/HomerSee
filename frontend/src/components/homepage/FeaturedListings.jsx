import React, { useContext } from "react";
import { ListingContext } from "../../contexts/ListingContextProvider";
import { Link } from "react-router-dom";

const FeaturedListings = () => {
  const { listings } = useContext(ListingContext);

  // take first 6 listings
  const featured = listings.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Featured Listings
      </h2>

      {featured.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((listing) => (
            <Link
              to={`/listing/${listing._id}`}
              key={listing._id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group"
            >
              {/* image */}
              <div className="h-44 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {listing.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">
                    📍 {listing.location}
                  </span>

                  <span className="text-sm font-bold text-gray-900">
                    ${listing.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No featured listings available.</p>
      )}
    </div>
  );
};

export default FeaturedListings;
