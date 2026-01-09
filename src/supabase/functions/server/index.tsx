import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

const DISCORD_CLIENT_ID = '1459197358347911262';
const DISCORD_CLIENT_SECRET = Deno.env.get('DISCORD_CLIENT_SECRET') || '';
const DISCORD_REDIRECT_URI = Deno.env.get('DISCORD_REDIRECT_URI') || '';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1459196564206518437/oX0lLde_yDUsZOVPt9UpZALsi2rdcKxJWI9MgB4IENLsbgOEg2conl3Y5eTnrDhfOpMY';
const DISCORD_GUILD_ID = '1459195760150319290';
const ADMIN_ROLE_ID = '1459196167991595008';
const TICKET_ROLE_ID = '1459196844432294066';
const DISCORD_BOT_TOKEN = Deno.env.get('DISCORD_BOT_TOKEN') || '';

// Discord OAuth - Exchange code for token
app.post('/make-server-51abf09d/auth/discord/callback', async (c) => {
  try {
    const { code } = await c.req.json();
    
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      console.log('Token exchange error:', await tokenResponse.text());
      return c.json({ error: 'Failed to exchange code for token' }, 400);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user info
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      console.log('User fetch error:', await userResponse.text());
      return c.json({ error: 'Failed to fetch user info' }, 400);
    }

    const userData = await userResponse.json();

    // Get guild member to check roles
    const memberResponse = await fetch(
      `https://discord.com/api/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    let hasAdminRole = false;
    if (memberResponse.ok) {
      const memberData = await memberResponse.json();
      hasAdminRole = memberData.roles?.includes(ADMIN_ROLE_ID) || false;
    }

    // Store user session
    const sessionId = crypto.randomUUID();
    await kv.set(`session:${sessionId}`, {
      userId: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar,
      hasAdminRole,
      accessToken,
      createdAt: Date.now(),
    });

    return c.json({
      sessionId,
      user: {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        hasAdminRole,
      },
    });
  } catch (error) {
    console.log('Discord auth callback error:', error);
    return c.json({ error: 'Authentication failed' }, 500);
  }
});

// Get session
app.get('/make-server-51abf09d/auth/session/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const session = await kv.get(`session:${sessionId}`);

    if (!session) {
      return c.json({ error: 'Session not found' }, 404);
    }

    return c.json({
      user: {
        id: session.userId,
        username: session.username,
        discriminator: session.discriminator,
        avatar: session.avatar,
        hasAdminRole: session.hasAdminRole,
      },
    });
  } catch (error) {
    console.log('Session fetch error:', error);
    return c.json({ error: 'Failed to fetch session' }, 500);
  }
});

// Logout
app.post('/make-server-51abf09d/auth/logout', async (c) => {
  try {
    const { sessionId } = await c.req.json();
    await kv.del(`session:${sessionId}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Logout error:', error);
    return c.json({ error: 'Logout failed' }, 500);
  }
});

// Get all properties
app.get('/make-server-51abf09d/properties', async (c) => {
  try {
    const properties = await kv.getByPrefix('property:');
    return c.json(properties || []);
  } catch (error) {
    console.log('Get properties error:', error);
    return c.json({ error: 'Failed to fetch properties' }, 500);
  }
});

// Get single property
app.get('/make-server-51abf09d/properties/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const property = await kv.get(`property:${id}`);
    
    if (!property) {
      return c.json({ error: 'Property not found' }, 404);
    }
    
    return c.json(property);
  } catch (error) {
    console.log('Get property error:', error);
    return c.json({ error: 'Failed to fetch property' }, 500);
  }
});

// Create property (admin only)
app.post('/make-server-51abf09d/properties', async (c) => {
  try {
    const sessionId = c.req.header('X-Session-Id');
    if (!sessionId) {
      return c.json({ error: 'Unauthorized - no session' }, 401);
    }

    const session = await kv.get(`session:${sessionId}`);
    if (!session || !session.hasAdminRole) {
      return c.json({ error: 'Unauthorized - admin role required' }, 403);
    }

    const propertyData = await c.req.json();
    const propertyId = crypto.randomUUID();
    
    const property = {
      id: propertyId,
      ...propertyData,
      createdAt: Date.now(),
      createdBy: session.userId,
    };

    await kv.set(`property:${propertyId}`, property);

    // Send notification to Discord
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '🏠 Nouvelle Propriété Ajoutée',
            description: `**${property.name}**\n\nType: ${property.category}\nPrix: $${property.price.toLocaleString()}\nType de vente: ${property.saleType}`,
            color: 0x00ff00,
            timestamp: new Date().toISOString(),
            footer: { text: 'Dynasty 8 - NewWave' },
          }],
        }),
      });
    } catch (webhookError) {
      console.log('Webhook error:', webhookError);
    }

    return c.json(property);
  } catch (error) {
    console.log('Create property error:', error);
    return c.json({ error: 'Failed to create property' }, 500);
  }
});

// Update property (admin only)
app.put('/make-server-51abf09d/properties/:id', async (c) => {
  try {
    const sessionId = c.req.header('X-Session-Id');
    if (!sessionId) {
      return c.json({ error: 'Unauthorized - no session' }, 401);
    }

    const session = await kv.get(`session:${sessionId}`);
    if (!session || !session.hasAdminRole) {
      return c.json({ error: 'Unauthorized - admin role required' }, 403);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existingProperty = await kv.get(`property:${id}`);
    if (!existingProperty) {
      return c.json({ error: 'Property not found' }, 404);
    }

    const updatedProperty = {
      ...existingProperty,
      ...updates,
      updatedAt: Date.now(),
    };

    await kv.set(`property:${id}`, updatedProperty);
    return c.json(updatedProperty);
  } catch (error) {
    console.log('Update property error:', error);
    return c.json({ error: 'Failed to update property' }, 500);
  }
});

// Delete property (admin only)
app.delete('/make-server-51abf09d/properties/:id', async (c) => {
  try {
    const sessionId = c.req.header('X-Session-Id');
    if (!sessionId) {
      return c.json({ error: 'Unauthorized - no session' }, 401);
    }

    const session = await kv.get(`session:${sessionId}`);
    if (!session || !session.hasAdminRole) {
      return c.json({ error: 'Unauthorized - admin role required' }, 403);
    }

    const id = c.req.param('id');
    await kv.del(`property:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Delete property error:', error);
    return c.json({ error: 'Failed to delete property' }, 500);
  }
});

// Get categories
app.get('/make-server-51abf09d/categories', async (c) => {
  try {
    const categoriesData = await kv.get('categories');
    const defaultCategories = [
      'Appartements',
      'Appartements luxueux',
      'Maisons modernes',
      'Bureaux',
      'Entrepôts',
      'Club de biker',
      'Garages',
    ];
    
    return c.json(categoriesData?.list || defaultCategories);
  } catch (error) {
    console.log('Get categories error:', error);
    return c.json({ error: 'Failed to fetch categories' }, 500);
  }
});

// Add category (admin only)
app.post('/make-server-51abf09d/categories', async (c) => {
  try {
    const sessionId = c.req.header('X-Session-Id');
    if (!sessionId) {
      return c.json({ error: 'Unauthorized - no session' }, 401);
    }

    const session = await kv.get(`session:${sessionId}`);
    if (!session || !session.hasAdminRole) {
      return c.json({ error: 'Unauthorized - admin role required' }, 403);
    }

    const { category } = await c.req.json();
    const categoriesData = await kv.get('categories');
    const categories = categoriesData?.list || [
      'Appartements',
      'Appartements luxueux',
      'Maisons modernes',
      'Bureaux',
      'Entrepôts',
      'Club de biker',
      'Garages',
    ];

    if (!categories.includes(category)) {
      categories.push(category);
      await kv.set('categories', { list: categories });
    }

    return c.json({ categories });
  } catch (error) {
    console.log('Add category error:', error);
    return c.json({ error: 'Failed to add category' }, 500);
  }
});

// Create order
app.post('/make-server-51abf09d/orders', async (c) => {
  try {
    const sessionId = c.req.header('X-Session-Id');
    if (!sessionId) {
      return c.json({ error: 'Unauthorized - no session' }, 401);
    }

    const session = await kv.get(`session:${sessionId}`);
    if (!session) {
      return c.json({ error: 'Unauthorized - invalid session' }, 401);
    }

    const orderData = await c.req.json();
    const orderId = crypto.randomUUID();
    
    const order = {
      id: orderId,
      userId: session.userId,
      username: session.username,
      ...orderData,
      status: 'pending',
      createdAt: Date.now(),
    };

    await kv.set(`order:${orderId}`, order);

    // Create Discord channel for this order
    try {
      // First, send webhook notification
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `<@&${TICKET_ROLE_ID}>`,
          embeds: [{
            title: '🛒 Nouvelle Commande',
            description: `**Commande #${orderId.substring(0, 8)}**\n\n**Client:** ${order.customerName}\n**Téléphone RP:** ${order.phoneNumber}\n**Discord:** ${session.username}\n\n**Propriétés commandées:**\n${order.items.map((item: any) => `• ${item.name} - $${item.price.toLocaleString()}`).join('\n')}\n\n**Total:** $${order.total.toLocaleString()}\n\n**Message:**\n${order.message || 'Aucun message'}`,
            color: 0x0099ff,
            timestamp: new Date().toISOString(),
            footer: { text: 'Dynasty 8 - NewWave' },
          }],
        }),
      });

      // Try to create channel using bot token
      if (DISCORD_BOT_TOKEN) {
        const channelResponse = await fetch(
          `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/channels`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: `commande-${orderId.substring(0, 8)}`,
              type: 0, // Text channel
              topic: `Commande de ${order.customerName} - ${session.username}`,
              permission_overwrites: [
                {
                  id: DISCORD_GUILD_ID, // @everyone
                  type: 0,
                  deny: '1024', // VIEW_CHANNEL
                },
                {
                  id: TICKET_ROLE_ID, // Staff role
                  type: 0,
                  allow: '1024', // VIEW_CHANNEL
                },
                {
                  id: session.userId, // Customer
                  type: 1,
                  allow: '1024', // VIEW_CHANNEL
                },
              ],
            }),
          }
        );

        if (channelResponse.ok) {
          const channelData = await channelResponse.json();
          order.discordChannelId = channelData.id;
          await kv.set(`order:${orderId}`, order);

          // Send message in the new channel
          await fetch(
            `https://discord.com/api/channels/${channelData.id}/messages`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                embeds: [{
                  title: '🛒 Détails de la Commande',
                  description: `**Client:** ${order.customerName}\n**Téléphone RP:** ${order.phoneNumber}\n**Discord:** ${session.username}\n\n**Propriétés:**\n${order.items.map((item: any) => `• ${item.name} (${item.category}) - $${item.price.toLocaleString()}`).join('\n')}\n\n**Total:** $${order.total.toLocaleString()}\n\n**Message du client:**\n${order.message || 'Aucun message'}`,
                  color: 0x00ff00,
                  timestamp: new Date().toISOString(),
                }],
              }),
            }
          );
        }
      }
    } catch (discordError) {
      console.log('Discord channel creation error:', discordError);
    }

    return c.json(order);
  } catch (error) {
    console.log('Create order error:', error);
    return c.json({ error: 'Failed to create order' }, 500);
  }
});

// Get user orders
app.get('/make-server-51abf09d/orders', async (c) => {
  try {
    const sessionId = c.req.header('X-Session-Id');
    if (!sessionId) {
      return c.json({ error: 'Unauthorized - no session' }, 401);
    }

    const session = await kv.get(`session:${sessionId}`);
    if (!session) {
      return c.json({ error: 'Unauthorized - invalid session' }, 401);
    }

    const allOrders = await kv.getByPrefix('order:');
    
    // If admin, return all orders, otherwise only user's orders
    const orders = session.hasAdminRole 
      ? allOrders 
      : allOrders.filter((order: any) => order.userId === session.userId);

    return c.json(orders || []);
  } catch (error) {
    console.log('Get orders error:', error);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Update order status (admin only)
app.put('/make-server-51abf09d/orders/:id', async (c) => {
  try {
    const sessionId = c.req.header('X-Session-Id');
    if (!sessionId) {
      return c.json({ error: 'Unauthorized - no session' }, 401);
    }

    const session = await kv.get(`session:${sessionId}`);
    if (!session || !session.hasAdminRole) {
      return c.json({ error: 'Unauthorized - admin role required' }, 403);
    }

    const id = c.req.param('id');
    const { status } = await c.req.json();
    
    const order = await kv.get(`order:${id}`);
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }

    order.status = status;
    order.updatedAt = Date.now();
    await kv.set(`order:${id}`, order);

    return c.json(order);
  } catch (error) {
    console.log('Update order error:', error);
    return c.json({ error: 'Failed to update order' }, 500);
  }
});

Deno.serve(app.fetch);
