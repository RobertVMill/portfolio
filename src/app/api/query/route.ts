import { NextResponse } from 'next/server';
import {
  initializeEmbeddings,
  findSimilarChunks,
  generateResponse,
} from '@/utils/embeddings';

// Initialize embeddings when the server starts
let initialized = false;
const initialize = async () => {
  if (!initialized) {
    await initializeEmbeddings();
    initialized = true;
  }
};

export async function POST(request: Request) {
  try {
    // Initialize embeddings if not already done
    await initialize();

    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Find similar chunks using embeddings
    const similarChunks = await findSimilarChunks(query);

    // Generate a response using the similar chunks
    const response = generateResponse(query, similarChunks);

    return NextResponse.json({
      response,
      relevantChunks: similarChunks.map(({ id, metadata, similarity }) => ({
        id,
        metadata,
        similarity,
      })),
    });
  } catch (error) {
    console.error('Error processing query:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
