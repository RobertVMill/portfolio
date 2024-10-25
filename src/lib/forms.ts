// src/lib/forms.ts
export async function submitContactForm(data: FormData) {
    try {
      const response = await fetch(process.env.FORMSPREE_ENDPOINT!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error('Form submission failed');
      
      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      return { 
        success: false, 
        error: 'Failed to submit form. Please try again.' 
      };
    }
  }