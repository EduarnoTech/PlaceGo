export default async function getToken(role) {
    const response = await fetch(`https://prod-in2.100ms.live/hmsapi/tutorlancer.app.100ms.live/api/token`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: '5fc62c5872909272bf9995e1', 
        role: role, // listener , speaker , moderator
        room_id : "639440a7ea4ced3e87595661",
      }),
    });
  
    const { token } = await response.json();
  
    return token;
  }
  