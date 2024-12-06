export const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json(); // Retourne les données sous forme JSON
};
