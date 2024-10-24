import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    // Add to Cart functionality
    const addToCart = useCallback(
        async (itemId, size) => {
            if (!size) {
                toast.error("Select Product Size");
                return;
            }

            const cartData = { ...cartItems };

            if (cartData[itemId]) {
                cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
            } else {
                cartData[itemId] = { [size]: 1 };
            }
            setCartItems(cartData);

            if (token) {
                try {
                    await axios.post(
                        `${backendUrl}/api/cart/add`,
                        { itemId, size },
                        { headers: { token } }
                    );
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to add item to the cart.");
                }
            }
        },
        [cartItems, token, backendUrl]
    );

    // Get the total count of items in the cart
    const getCartCount = () => {
        return Object.values(cartItems).reduce((acc, sizes) => {
            return (
                acc +
                Object.values(sizes).reduce((sum, count) => sum + count, 0)
            );
        }, 0);
    };

    // Update item quantity in cart
    const updateQuantity = useCallback(
        async (itemId, size, quantity) => {
            const cartData = { ...cartItems };
            cartData[itemId][size] = quantity;
            setCartItems(cartData);

            if (token) {
                try {
                    await axios.post(
                        `${backendUrl}/api/cart/update`,
                        { itemId, size, quantity },
                        { headers: { token } }
                    );
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to update cart item.");
                }
            }
        },
        [cartItems, token, backendUrl]
    );

    // Calculate total amount of the cart
    const getCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) return total;
            return (
                total +
                Object.entries(cartItems[itemId]).reduce(
                    (sum, [size, count]) => {
                        return sum + itemInfo.price * count;
                    },
                    0
                )
            );
        }, 0);
    };

    // Fetch product data
    const getProductsData = useCallback(async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch products.");
        }
    }, [backendUrl]);

    // Fetch user cart data
    const getUserCart = useCallback(
        async (token) => {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/cart/get`,
                    {},
                    { headers: { token } }
                );

                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch cart data.");
            }
        },
        [backendUrl]
    );

    useEffect(() => {
        getProductsData();
    }, [getProductsData]);

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (!token && localToken) {
            setToken(localToken);
            getUserCart(localToken);
        }
    }, [token, getUserCart]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount, // Works as a function
        updateQuantity,
        getCartAmount, // Now a function
        navigate,
        backendUrl,
        setToken,
        token,
        setCartItems,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
