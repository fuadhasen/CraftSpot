import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Services() {
    const [services, setServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch services from the backend
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/services'); // Adjust the API endpoint accordingly
                const data = await response.json();
                setServices(data);
            } catch (err) {
                // console.error("Error fetching services:", error);
            }
            setLoading(false);
        };
        fetchServices();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Optionally implement search filtering on the services
        // or send the search query to the backend
        const filteredServices = services.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setServices(filteredServices);
    };

    return (
        <div className="h-screen">
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mt-8 mx-4">Browse Services</h1>
                <p className="text-lg text-gray-600 mt-4 mx-4">
                    Find skilled professionals for your home and business needs.
                </p>
                <div className="grid grid-cols-1 gap-4 mt-8">
                    <form className="relative grid grid-cols-1 mx-4" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search for services"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full col-span-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 pr-16"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-0 bg-blue-600 h-full p-2 text-white rounded-lg"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {loading ? (
                        <p className="mx-4">Loading services...</p>
                    ) : (
                        services.length > 0 ? (
                            services.map((service) => (
                                <div key={service.id} className="bg-white rounded-lg shadow-lg p-4">
                                    <img
                                        src={service.image_url || "https://via.placeholder.com/300"}
                                        alt={service.name}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <h2 className="text-xl font-semibold mt-4">{service.name}</h2>
                                    <p className="text-gray-600 mt-2">{service.description}</p>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
                                        Book Now
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="mx-4">No services found.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Services;