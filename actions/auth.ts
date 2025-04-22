'use server'

// Types for login
export type TLoginInput = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
};

// Server action to handle login
export async function loginUser(data: TLoginInput): Promise<TLoginResponse> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://7760182c8f9d.ngrok.app';
    
    const response = await fetch(`${API_URL}/auth.login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }
    
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Failed to login');
  }
} 