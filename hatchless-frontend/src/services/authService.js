import hatchlessClient from "./hatchlessClient.js";

export const authService = {
  async login(email, password) {
    try {
      const response = await hatchlessClient.post('/login', {
        user: { email, password }
      });

      const authToken = response.headers.authorization?.split(' ')[1];

      if (authToken) {
        storeAuthTokenAndUser(authToken, response.data.data);
      } else {
        throw new Error('Authorization token not found');
      }

      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  async signup(firstName, lastName, email, password, password_confirmation) {
    try {
      const response = await hatchlessClient.post('/signup', {
        user: { first_name: firstName, last_name: lastName, email, password, password_confirmation }
      });

      const authToken = response.headers.authorization?.split(' ')[1];
      if (authToken) {
        storeAuthTokenAndUser(authToken, response.data.data);
      } else {
        throw new Error('Authorization token not found');
      }

      return response.data;
    } catch (error) {
      throw new Error('Signup failed');
    }
  },

  async logout() {
    try {
      await hatchlessClient.delete('/logout');
    } catch (error) {
      // Handle error if needed
    } finally {
      clearAuthTokenAndUser();
    }
  },

  getAuthToken() {
    return localStorage.getItem('authToken');
  },

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  hasCredentials() {
    const token = this.getAuthToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }
}

const storeUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

const storeAuthToken = (token) => {
  localStorage.setItem('authToken', token);
}

const clearAuthTokenAndUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('cartId');
}

const storeAuthTokenAndUser = (token, user) => {
  storeAuthToken(token);
  storeUser(user);
}