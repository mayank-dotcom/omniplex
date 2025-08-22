import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});


interface CartItem {
  id: string;
  quantity: number;
}

interface RequestBody {
  items: CartItem[];
}


const storeItems = new Map([
  [
    "1", 
    { 
      priceInCents: 1000, // $10.00
      name: "Premium Service" 
    }
  ],
  [
    "2", 
    { 
      priceInCents: 0, // $0.00
      name: "Basic Service" 
    }
  ],
]);

export async function POST(request: NextRequest) {
    try {
        
        const body: RequestBody = await request.json();

       
        if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
            return NextResponse.json(
                { error: { message: 'Items array is required and must not be empty' } },
                { status: 400 }
            );
        }
 // Create line items for Stripe checkout
        const lineItems = body.items.map((item: CartItem) => {
            const storeItem = storeItems.get(item.id);
            if (!storeItem) {
                throw new Error(`Item with id ${item.id} not found`);
            }
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: storeItem.name,
                    },
                    unit_amount: storeItem.priceInCents,
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/cancel`,
        });
        
        return NextResponse.json({ url: session.url });
        
    } catch (error) {
        console.error('Error creating checkout session:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json(
            { error: { message: errorMessage } },
            { status: 500 }
        );
    }
}

