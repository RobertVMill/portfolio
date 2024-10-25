// src/lib/api.ts
export class APIError extends Error {
    constructor(
      message: string,
      public status: number,
      public code?: string
    ) {
      super(message);
      this.name = 'APIError';
    }
  }
  
  export async function fetchWithError<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new APIError(
          'Failed to fetch data',
          response.status
        );
      }
  
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(
        'Network error',
        500
      );
    }
  }
  
  // Usage example:
  // const data = await fetchWithError('/api/posts');