/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import axios from 'axios'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { fetchKeyDetails, fetchProductsShopify } from '../../../utils/route';
import { erc20Abi, parseUnits } from 'viem';
import { simulateTransaction } from '@/utils/simulatetransaction'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  verify:'silent',
})

const usdcContractAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; 

app.frame('/shop/:id', (c) => {
  i=0;
  const id = c.req.param('id');
    return c.res({
      action: `/next/${id}`,
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
      imageAspectRatio:"1.91:1",
      headers:{
        'Content-Type': 'image/jpeg'
      },
      intents: [
        <Button key='pstart' value='P'>Start Shopping</Button>,
      ]
    })
  })
app.frame('/shop', (c) => {
    return c.res({
     image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
      intents: [
        <Button.Link key='py' href='https://www.shopify.com/'>Check</Button.Link>,
      ]
    })
  })
let i=0
app.frame('/next/:id', async(c) => {
  try{
   const id = c.req.param('id');
  const { shopifyToken, publicUrl,walletAddress } = await fetchKeyDetails(id);
const products =await fetchProductsShopify(shopifyToken,publicUrl)
const firstProduct=products[i];
i++;

    return c.res({
      action: `/next2/${id}`,
    image:(
        <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          fontSize: 80,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
         <img src={firstProduct.image_src} alt={firstProduct.title} height={390}/>
        <p
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: 40,
            fontWeight: 300,
            margin: 0,
          }}
        >
      {firstProduct.title}{' '}
          {' '}
        </p>
          <p
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgb(121, 40, 242), rgb(255, 0, 128))',
              backgroundClip: 'text',
              color: 'transparent',
              fontSize: 50,
              fontWeight: 700,
              margin: 0,
              marginTop: 20,
            }}
          >
            ${firstProduct.price}

          </p>
      </div>
    ),
      imageAspectRatio:"1:1",
      headers:{
        'Content-Type': 'image/jpeg'
      },
      intents: [
        // <TextInput placeholder="($USDC | ETH)" />,
        <Button key='pay' value='N'>Next</Button>,
        <Button key='variants' action={`/V/${i}/${id}`} value='V'>Variants</Button>,
        <Button.Transaction key="transaction" action={`/confirmit/${id}/${firstProduct.title}/${firstProduct.price}`} target={`/send-usdc/${firstProduct.price}/${walletAddress}`}>Buy</Button.Transaction>,

      ]
    })
  }
  catch(error){
    return c.res({
      action: `/shop`,
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
      imageAspectRatio:"1.91:1",
      headers:{
        'Content-Type': 'image/jpeg'
      },
      intents: [
        <Button key='payed' action='/' value='P'>Something wrong</Button>,
      ]
    })
  }
  })


app.frame('/next2/:id',async(c) => {
try{
i=i+1;
const id = c.req.param('id');
const { shopifyToken, publicUrl,walletAddress } = await fetchKeyDetails(id);
const products =await fetchProductsShopify(shopifyToken,publicUrl)
const firstProduct=products[i]

if(i==products.length){
  return c.res({

    image:(
      <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
        fontSize: 80,
        fontWeight: 700,
        textAlign: 'center',
      }}
    >
       <img src={firstProduct.image_src} alt={firstProduct.title} height={390}/>
      <p
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
          backgroundClip: 'text',
          color: 'transparent',
          fontSize: 30,
          fontWeight: 400,
          margin: 0,
        }}
      >
    {firstProduct.title}{' '}
        {' '}
      </p>
        <p
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgb(121, 40, 242), rgb(255, 0, 128))',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: 50,
            fontWeight: 700,
            margin: 0,
            marginTop: 20,
          }}
        >
          ${firstProduct.price}

        </p>
    </div>
  ),
    imageAspectRatio:"1:1",
    action: `/next2/${id}`,
    headers:{
      'Content-Type': 'image/jpeg'
    },
    intents: [
      <Button key='payment' action={`/V/${i}/${id}`} value='V'>Variants</Button>,
      <Button.Transaction key="transaction" action={`/confirmit/${id}/${firstProduct.title}/${firstProduct.price}`} target={`/send-usdc/${firstProduct.price}/${walletAddress}`}>Buy</Button.Transaction>,
    ]
  })

}

else{
    return c.res({
      image:(
        <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          fontSize: 80,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
         <img src={firstProduct.image_src} alt={firstProduct.title} height={390}/>
        <p
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: 30,
            fontWeight: 400,
            margin: 0,
          }}
        >
      {firstProduct.title}{' '}
          {' '}
        </p>
          <p
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgb(121, 40, 242), rgb(255, 0, 128))',
              backgroundClip: 'text',
              color: 'transparent',
              fontSize: 50,
              fontWeight: 700,
              margin: 0,
              marginTop: 20,
            }}
          >
            ${firstProduct.price}

          </p>
      </div>
    ),
      imageAspectRatio:"1:1",
      action: `/next2/${id}`,
      headers:{
        'Content-Type': 'image/jpeg'
      },
      intents: [
        // <TextInput placeholder="($USDC | ETH)" />,
        <Button key='pay' value='P'>Next</Button>,
        <Button.Transaction key="transaction" action={`/confirmit/${id}/${firstProduct.title}/${firstProduct.price}`} target={`/send-usdc/${firstProduct.price}/${walletAddress}`}>Buy</Button.Transaction>,
        <Button key='payment' action={`/V/${i}/${id}`} value='V'>Variants</Button>,
      ]
    })}
 
  }
  catch(error){
    return c.res({
      action: `/shop`,
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
      imageAspectRatio:"1.91:1",
      headers:{
        'Content-Type': 'image/jpeg'
      },
      intents: [
        <Button key='pay' action='/' value='P'>Something wrong</Button>,
      ]
    })
  }
 
  })

  let jj=0;


  app.frame('/V/:i/:id', async(c) => {
    try{
    const id = c.req.param('i');
    const id2=c.req.param('id');

    const { shopifyToken, publicUrl,walletAddress } = await fetchKeyDetails(id2);
    const products =await fetchProductsShopify(shopifyToken,publicUrl)
    let variantsLen=products[id].variants.length;

    if(variantsLen==0 ){
      return c.res({
        action: `/next/${id2}`,
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
        imageAspectRatio:"1.91:1",
        headers:{
          'Content-Type': 'image/jpeg'
        },
        intents: [
          <Button key='pay' value='P'>No variants Found</Button>,
        ]
      })
    }
    const firstProducts=products[id].variants[jj]

if(firstProducts.image_src==null){
  return c.res({
    action: `/next/${id2}`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
    imageAspectRatio:"1.91:1",
    headers:{
      'Content-Type': 'image/jpeg'
    },
    intents: [
      <Button key='No' value='P'>No product/img Found(Next)</Button>,
      <Button.Link key='pay' href='https://admin.shopify.com/store'>Kindly Add IMG</Button.Link>,
    ]
  })
}

      jj++;
if(variantsLen==0){
  return c.res({
    action: `/next/${id2}`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
    imageAspectRatio:"1.91:1",
    headers:{
      'Content-Type': 'image/jpeg'
    },
    intents: [
      <Button key='pay' value='P'>No variants Found</Button>,
    ]
  })
}
      //1 2 
      if(jj==variantsLen){
        return c.res({
      
          image:(
            <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
              fontSize: 80,
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
             <img src={firstProducts.image_src} alt={firstProducts.title} height={390}/>
            <p
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
                backgroundClip: 'text',
                color: 'transparent',
                fontSize: 30,
                fontWeight: 400,
                margin: 0,
              }}
            >
          {firstProducts.title}{' '}
              {' '}
            </p>
              <p
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgb(121, 40, 242), rgb(255, 0, 128))',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontSize: 50,
                  fontWeight: 700,
                  margin: 0,
                  marginTop: 20,
                }}
              >
                ${firstProducts.price}
      
              </p>
          </div>
        ),
          imageAspectRatio:"1:1",
          action: `/next2/${id}`,
          headers:{
            'Content-Type': 'image/jpeg'
          },
          intents: [
            <Button key='payment' action={`/next`} value='P'>Home</Button>,
            <Button.Transaction key="transaction" action={`/confirmit/${id}/${firstProducts.title}/${firstProducts.price}`} target={`/send-usdc/${firstProducts.price}/${walletAddress}`}>Buy</Button.Transaction>,
          ]
        })
      
      }
      else{
    return c.res({
      image:(
        <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          fontSize: 80,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
         <img src={firstProducts.image_src} alt={firstProducts.title} height={390}/>
        <p
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: 30,
            fontWeight: 400,
            margin: 0,
          }}
        >
      {firstProducts.title}{' '}
          {' '}
        </p>
          <p
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgb(121, 40, 242), rgb(255, 0, 128))',
              backgroundClip: 'text',
              color: 'transparent',
              fontSize: 40,
              fontWeight: 700,
              margin: 2,
              marginTop: 20,
            }}
          >
            ${firstProducts.price}

          </p>
      </div>
    ),
      imageAspectRatio:"1:1",
      headers:{
        'Content-Type': 'image/jpeg'
      },
      action: `/V/${id}`,
      intents: [
        // <TextInput placeholder="($USDC | ETH)" />,
        <Button key='pay' value='P'>VariantsN</Button>,
        <Button.Transaction key="transaction" action={`/confirmit/${id}/${firstProducts.title}/${firstProducts.price}`} target={`/send-usdc/${firstProducts.price}/${walletAddress}`}>Buy</Button.Transaction>,
      ]
    })
  }
}
catch(error){
  return c.res({
    action: `/shop`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
    imageAspectRatio:"1.91:1",
    headers:{
      'Content-Type': 'image/jpeg'
    },
    intents: [
      <Button key='pay' action='/' value='P'>Something went wrong</Button>,
    ]
  })
}
  })


  app.use("/send-usdc/*",async (c, next) => {
    const path = c.req.path;
    const [ , , , price, walletAddress] = path.split('/');
    if(walletAddress=='flag'){
      await next();
    }
 else{
    let response = await simulateTransaction(walletAddress)

    if(response =='allow'){
      await next();
    }
    else{
       return c.redirect('flag')
    }
    }
        }); 

  app.frame('/send-usdc/:price/flag', (c) => {
          return c.res({
           image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
            intents: [
              <Button.Link key='py' href='https://app.shield3.com/'>You are Not ALLOWED</Button.Link>,
            ]
          })
        })

    app.transaction('/send-usdc/:price/:walletAddress', async (c) => {

      const price = c.req.param('price');
      const walletAddress = c.req.param('walletAddress');
    
        return c.contract({
          // @ts-ignore
          abi: erc20Abi,
          chainId: 'eip155:8453',
          //@ts-ignore
          functionName: 'transfer',
          args: [
            //@ts-ignore
            walletAddress,
            parseUnits(price, 6)
          ],
          to: usdcContractAddress,
        });

    });


app.frame('/confirmit/:id/:title/:price',async (c) => {
  const id=c.req.param("id")
  const title=c.req.param("title")
  const price=c.req.param("price")
    const { transactionId} = c
    return c.res({
      action:`/confirm/${id}/${title}/${price}`,
      image:(
  <div
  style={{
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(to bottom, #dbc4ff, #fbc5f1)',
    fontSize: 30,
    fontWeight: 800,
    textAlign: 'center',
  }}
  >
  {transactionId
    ? `tnxs : ${transactionId.slice(0, 3)}...${transactionId.slice(-3)} 
    Enter details in this format- 
    email:first_name:last_name:address:province:state:phone:city:country:zip:quantity`
  
    : 'transaction ...'}
  </div>
      )
  ,
      intents: [
        <TextInput placeholder="(1/3 NYC-US)" />,
        <Button key='pay' value='C'>Confirm Details</Button>,
        <Button.Link href={`https://base.blockscout.com/tx/${transactionId}`} key='Tnx' >View Explorer</Button.Link>
      ],
    })
  })

app.frame('/confirm/:id/:title/:price',async (c) => {

  try{
  const id=c.req.param("id")
  const title=c.req.param("title")
  const price=c.req.param("price")
  const decodedTitle=decodeURIComponent(title)

      const { inputText = '',previousButtonValues } = c
      const splitInput = inputText.split(':');

      const { shopifyToken, publicUrl,walletAddress } = await fetchKeyDetails(id);
     const [
      emailAddress,first_name,last_name,address,province,phone,city,state,country,zip
    ] = splitInput;
console.log(emailAddress,first_name,last_name,address,province,phone,city,state,country,zip);

const url = `${publicUrl}/admin/api/2024-04/orders.json`;
// const url = 'https://quickstart-bc2bbab8.myshopify.com/admin/api/2024-04/orders.json';
const data = {
  "order": {
    "email": emailAddress,
    "fulfillment_status": "fulfilled",
    "send_receipt": true,
    "send_fulfillment_receipt": true,
    "shipping_address": {
      "first_name": first_name,
      "last_name": last_name,
      "address1": address,
      "phone": phone,
      "city": city,
      "province": province,
      "country": country,
      "zip": zip
    },
    "billing_address": {
      "first_name": first_name,
      "last_name": last_name,
      "address1": address,
      "phone": phone,
      "city": city,
      "province": province,
      "country": country,
      "zip": zip
    },
    "customer": {
      "first_name": first_name,
      "last_name": last_name,
      "email": emailAddress,
      'state':state
    },
    "financial_status": "paid",
    "line_items": [
      {
        "title": decodedTitle,
        "price": price,
        "quantity":1
      }
    ]
  }
};

const headers = { 
  'X-Shopify-Access-Token': shopifyToken, 
  'Content-Type': 'application/json'
};

try {
  const response = await axios.post(url, data, { headers });
  console.log('Order created:', response.data);
} 
catch (error) {
  console.error('Error creating order:', error);
}
  return c.res({
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
    headers:{
      'Content-Type': 'image/jpeg'
    },
    intents: [
      <Button key='pay' value='P'>Sucessfully purchased</Button>,
    ]
  })
}
catch(error){
  return c.res({
    action: `/shop`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/shopifyBased.jpeg`,
    imageAspectRatio:"1.91:1",
    headers:{
      'Content-Type': 'image/jpeg'
    },
    intents: [
      <Button key='pay' action='/' value='P'>Something went wrong</Button>,
    ]
  })
}
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
