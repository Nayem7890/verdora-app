// Mock Authentication Utility with Cookie Storage
// Hardcoded credentials for demo purposes

export const MOCK_CREDENTIALS = {
    email: "demo@verdora.com",
    password: "demo123",
};

const COOKIE_NAME = "verdora_mock_auth";

// Set a cookie
function setCookie(name, value, days = 7) {
    if (typeof document === "undefined") return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// Get a cookie value
function getCookie(name) {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
}

// Delete a cookie
function deleteCookie(name) {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

/**
 * Mock login with hardcoded credentials
 * @param {string} email 
 * @param {string} password 
 * @returns {{ success: boolean, error?: string, user?: object }}
 */
export function mockLogin(email, password) {
    if (
        email === MOCK_CREDENTIALS.email &&
        password === MOCK_CREDENTIALS.password
    ) {
        const userData = {
            email: MOCK_CREDENTIALS.email,
            displayName: "Demo User",
            isMockUser: true,
            loginTime: Date.now(),
        };
        setCookie(COOKIE_NAME, JSON.stringify(userData));
        return { success: true, user: userData };
    }
    return { success: false, error: "Invalid email or password" };
}

/**
 * Logout - clears the mock auth cookie
 */
export function mockLogout() {
    deleteCookie(COOKIE_NAME);
}

/**
 * Check if user is logged in via mock auth
 * @returns {boolean}
 */
export function isMockLoggedIn() {
    const cookie = getCookie(COOKIE_NAME);
    if (!cookie) return false;
    try {
        const user = JSON.parse(cookie);
        return user && user.isMockUser === true;
    } catch {
        return false;
    }
}

/**
 * Get mock user data from cookie
 * @returns {object|null}
 */
export function getMockUser() {
    const cookie = getCookie(COOKIE_NAME);
    if (!cookie) return null;
    try {
        const user = JSON.parse(cookie);
        return user && user.isMockUser ? user : null;
    } catch {
        return null;
    }
}
