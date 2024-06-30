import axios from "axios";
import { Buffer } from "buffer";
export const fetchProducts = async (username:string,password:string,urlLink:string) => {

    try {

    //  const username= 'ck_2d50a399f4a7042296686c91659011fafa2d9eab';
    //  const password= 'cs_5db11d388d97aebef15d8dee5d5d8ec6e30d00bd';
     const basicAuthString = Buffer.from(`${username}:${password}`, 'utf-8').toString('base64');

    //  const response = await axios.get('https://woo-swiftly-spooky-koala.wpcomstaging.com/wp-json/wc/v3/products', {
     const response = await axios.get(`${urlLink}/wp-json/wc/v3/products`, {
       headers: {
         Authorization: `Basic ${basicAuthString}`
       }
     });
     console.log("res ",response.data)
    const extractedProducts = response.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images.length > 0 ? product.images[0].src : '' 
    }));
      return extractedProducts; // Return the extracted products directly
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; // Return an empty array in case of error
    }
  };

 export const createPaidOrder = async (first_name:string,last_name:string,address:string,city:string,state:string,postcode:string,country:string,email:string,phone:string,k:string) => {
    try {
      const username= 'ck_2d50a399f4a7042296686c91659011fafa2d9eab';
      const password= 'cs_5db11d388d97aebef15d8dee5d5d8ec6e30d00bd';
      const basicAuthString = Buffer.from(`${username}:${password}`, 'utf-8').toString('base64');
  
      const data = {
        payment_method: 'bacs',
        payment_method_title: 'Crypto USDC Payment',
        set_paid: true,
        billing: {
          // first_name: 'nithin',
          // last_name: 'reddy',
          // address_1: '969 Market',
          // address_2: '',
          // city: 'San Francisco',
          // state: 'CA',
          // postcode: '94103',
          // country: 'US',
          // email: 'nithinkatkam504106@gmail.com',
          // phone: '7023781232',
          first_name: first_name,
          last_name: last_name,
          address_1: address,
          address_2: '',
          city: city,
          state: state,
          postcode: postcode,
          country: country,
          email: email,
          phone: phone,
        },
        shipping: {
          first_name: first_name,
          last_name: last_name,
          address_1: address,
          address_2: '',
          city: city,
          state: state,
          postcode: postcode,
          country: country,
        },
        line_items: [
          {
            product_id: k,
            quantity: 1,
          }
        ],
        shipping_lines: [
          {
            method_id: 'flat_rate',
            method_title: 'Crypto USDC Payment',
            total: '120.00',
          },
        ],
      };
  
      const response = await axios.post('https://woo-swiftly-spooky-koala.wpcomstaging.com/wp-json/wc/v3/orders', data, {
        headers: {
          Authorization: `Basic ${basicAuthString}`,
        },
      });
  
      console.log(response.data);
      return response.data; // Return the created order data
    } catch (error) {
      console.log('Error creating order:', error);
      throw error; // Throw error if there's an issue creating the order
    }
  };
  