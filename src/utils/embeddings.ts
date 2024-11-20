import HNSWLib from 'hnswlib-node';
import knowledgeBase from '@/data/knowledge_base.json';

let vectorStore: HNSWLib | null = null;
const EMBEDDING_DIM = 384; // sentence-transformers dimension

interface Chunk {
  id: string;
  text: string;
  metadata: {
    category: string;
    importance: string;
    [key: string]: any;
  };
}

async function generateEmbedding(text: string): Promise<Float32Array> {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer hf_xxx' // Replace with your Hugging Face token
        },
        body: JSON.stringify({ inputs: text })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return new Float32Array(result[0]);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

export async function initializeEmbeddings() {
  if (vectorStore) return;

  try {
    // Initialize the vector store
    vectorStore = new HNSWLib.HierarchicalNSW('cosine', EMBEDDING_DIM);
    vectorStore.initIndex(knowledgeBase.chunks.length);

    // Generate and add embeddings for all chunks
    console.log('Generating embeddings for chunks...');
    for (let i = 0; i < knowledgeBase.chunks.length; i++) {
      const chunk = knowledgeBase.chunks[i];
      console.log(`Processing chunk ${i + 1}/${knowledgeBase.chunks.length}: ${chunk.id}`);
      const embedding = await generateEmbedding(chunk.text);
      vectorStore.addPoint(embedding, i);
    }
    console.log('Embeddings generation complete!');
  } catch (error) {
    console.error('Error initializing embeddings:', error);
    throw error;
  }
}

export async function findSimilarChunks(
  query: string,
  k: number = 3
): Promise<Array<Chunk & { similarity: number }>> {
  if (!vectorStore) {
    throw new Error('Vector store not initialized');
  }

  try {
    const queryEmbedding = await generateEmbedding(query);
    const { neighbors, distances } = vectorStore.searchKnn(queryEmbedding, k);

    return neighbors.map((index: number, i: number) => ({
      ...knowledgeBase.chunks[index],
      similarity: 1 - distances[i], // Convert distance to similarity score
    }));
  } catch (error) {
    console.error('Error finding similar chunks:', error);
    throw error;
  }
}

export function generateResponse(
  query: string,
  chunks: Array<Chunk & { similarity: number }>
): string {
  if (chunks.length === 0) {
    return "I don't have enough relevant information to answer that question. Could you try rephrasing it?";
  }

  // Sort chunks by importance and similarity
  const sortedChunks = [...chunks].sort((a, b) => {
    const importanceScore = (chunk: Chunk) =>
      chunk.metadata.importance === 'high' ? 2 : 1;
    return (
      b.similarity * importanceScore(b) - a.similarity * importanceScore(a)
    );
  });

  // Use the most relevant chunk as the main response
  const mainChunk = sortedChunks[0];
  let response = mainChunk.text;

  // Add supporting information from other relevant chunks if they're highly similar
  if (sortedChunks.length > 1 && sortedChunks[1].similarity > 0.8) {
    response += ' ' + sortedChunks[1].text;
  }

  // Add context based on the query type
  const queryLower = query.toLowerCase();
  if (queryLower.includes('when') || queryLower.includes('date')) {
    const dateChunk = sortedChunks.find(chunk => chunk.metadata.date);
    if (dateChunk) {
      response += ` This was during ${dateChunk.metadata.date}.`;
    }
  }

  return response;
}
