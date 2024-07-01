import axios from 'axios';

export const fetchKeyDetails = async (id:string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ship/${id}`);
      
      // Assuming the key details are stored in response.data
      const { shopifyToken,publicUrl,walletAddress } = response.data;
      
      // Now you can use the key details as needed in your application

      return {shopifyToken,publicUrl,walletAddress  };
    } catch (error) {
      console.error('Error fetching key details:', error);
      return { urlLink: null, publicKey: null, secretKey: null }; // or handle error differently
    }
  };

  export const fetchProductsShopify = async (shopifyToken:string,publicUrl:string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_API_URL}/api/products`,{data:{shopifyToken,publicUrl}});
      
      // Assuming the key details are stored in response.data
    
      // Now you can use the key details as needed in your application
      return response.data;
    } catch (error) {
      console.error('Error fetching key details:', error);
      return { shopifyToken: null, walletAddress: null, publicUrl: null }; // or handle error differently
    }
  };
