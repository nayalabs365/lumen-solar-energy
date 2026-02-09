import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();

    if (!input || input.length < 3) {
      return NextResponse.json({ predictions: [] });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Call Google Places API (New) Autocomplete endpoint
    const response = await fetch(
      'https://places.googleapis.com/v1/places:autocomplete',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat',
        },
        body: JSON.stringify({
          input: input,
          includedRegionCodes: ['us'],
          includedPrimaryTypes: ['street_address'],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch predictions', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Autocomplete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
