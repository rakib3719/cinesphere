let watchlist = []; 

export async function GET() {
  return new Response(JSON.stringify({ watchlist }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const { movieId } = await req.json();
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId); 
  }
  return new Response(JSON.stringify({ watchlist }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req) {
  const { movieId } = await req.json();
  watchlist = watchlist.filter(id => id !== movieId); // Remove movieId from watchlist
  return new Response(JSON.stringify({ watchlist }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
