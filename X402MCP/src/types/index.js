// Type definitions for the X402MCP server

/**
 * @typedef {Object} ServerConfig
 * @property {string} name - The name of the MCP server
 * @property {string} version - The version of the MCP server
 */

/**
 * @typedef {Object} PaymentConfig
 * @property {string} privateKey - The Ethereum private key for payments
 * @property {string} baseURL - The base URL for the payment server
 * @property {string} endpointPath - The endpoint path for payments
 */

/**
 * @typedef {Object} ToolDefinition
 * @property {string} name - The name of the tool
 * @property {Object} schema - The tool schema definition
 * @property {Function} handler - The tool handler function
 */

/**
 * @typedef {Object} PaymentResponse
 * @property {boolean} success - Whether the payment was successful
 * @property {string} message - Payment status message
 * @property {Object} invoice - Invoice details
 */

/**
 * @typedef {Object} Invoice
 * @property {string} id - Invoice ID
 * @property {string} amount - Invoice amount
 * @property {string} description - Invoice description
 * @property {string} status - Invoice status
 * @property {string} createdAt - Creation timestamp
 * @property {string} paidAt - Payment timestamp
 */
